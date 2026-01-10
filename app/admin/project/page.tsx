"use client";
import BackButton from "@/components/BackButton";
import { useState } from "react";
import { getOrganisation } from "@/app/api/admin/organisation/Organinsation";
import { createProject, getManager } from "@/app/api/admin/project/Project";

// Constants
const OLD_MANAGER_ID = "oldManagerId"; 
const ALL_CHAR_STRINGS = "QWERTYUIOPASDFGHJKLZXCVBNM123456789!@#$%^&*";

// types 
interface ProjectForm{
    organisationName:string,
    projectName:string,
    assignTo:String,
    managerId:string,
}

interface ManagerGroup{
    managerName:string,
    managerId:string,
}

interface OrganisationGroup{
    id: number,
    organisationName: string,
    isActive: boolean,
}

export default function () {
  const [projectFormData, SetprojectFormData] = useState<Partial<ProjectForm>>({});
  const [managerGroup, setManagerGroup] = useState<Partial<ManagerGroup[]>>([]);
  const [organisationGroup, setOrganisationGroup] = useState<Partial<OrganisationGroup[]>>([]);

  async function ProjectFormChangeHandler(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    SetprojectFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "assignTo" && value === "oldManagerId" && managerGroup.length === 0) {
      const data = await getManager();
      if (!data?.success) {
        setManagerGroup([]);
        return;
      }

      const managerAdapter = (data.data ?? []).map((manager) => ({
        managerName: `${manager.firstName} ${manager.lastName}`,
        managerId: "",
      }));

      setManagerGroup(managerAdapter);
    }
  }

  async function ProjectFormSubmitHandler(e: React.FormEvent) {
    e.preventDefault();

    const submitter = (e.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement;

    if (submitter.name !== "formSubmit") return;

    if (
      !projectFormData?.assignTo ||
      !projectFormData?.managerId ||
      !projectFormData?.organisationName ||
      !projectFormData?.projectName
    ) {
      alert("Please fill all required fields");
      return;
    }

    const response = await createProject(projectFormData as ProjectForm);
    if (!response?.success) {
      alert("Something went wrong");
      return;
    }

    alert("Project created successfully");
    SetprojectFormData({});
  }

  function createManagerIdHandler() {
    let managerId = "";
    for (let i = 0; i < 8; i++) {
      managerId += ALL_CHAR_STRINGS[Math.floor(Math.random() * ALL_CHAR_STRINGS.length)];
    }
    SetprojectFormData((prev) => ({ ...prev, managerId }));
  }

  async function getActiveOrganisation() {
    try {
      const response = await getOrganisation();
      if (response.status) setOrganisationGroup(response.data ?? []);
    } catch {
      alert("Failed to fetch organisations");
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <BackButton />

      <form
        onSubmit={ProjectFormSubmitHandler}
        className="flex flex-col gap-4 mt-4"
      >
        {/* Organisation */}
        <select
          name="organisationName"
          onChange={ProjectFormChangeHandler}
          onClick={organisationGroup.length === 0 ? getActiveOrganisation : undefined}
          className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
        >
          <option value="Select">Select Organisation</option>
          {organisationGroup.map((org) => (
            <option key={org?.id} value={org?.organisationName}>
              {org?.organisationName}
            </option>
          ))}
        </select>

        {/* Project Name */}
        <input
          type="text"
          name="projectName"
          placeholder="Project Name"
          value={projectFormData.projectName ?? ""}
          onChange={ProjectFormChangeHandler}
          className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />

        {/* Assign Type */}
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="assignTo"
              value="newManagerId"
              checked={projectFormData.assignTo === "newManagerId"}
              onChange={ProjectFormChangeHandler}
            />
            Generate New Manager ID
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="assignTo"
              value="oldManagerId"
              checked={projectFormData.assignTo === "oldManagerId"}
              onChange={ProjectFormChangeHandler}
            />
            Select Existing Manager
          </label>
        </div>

        {/* Manager Selection */}
        {projectFormData.assignTo === "oldManagerId" ? (
          <select
            name="managerId"
            value={projectFormData.managerId ?? ""}
            onChange={ProjectFormChangeHandler}
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="Select">Select Manager</option>
            {managerGroup.map((manager) => (
              <option key={manager?.managerName} value={manager?.managerName}>
                {manager?.managerName}
              </option>
            ))}
          </select>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={projectFormData.managerId ?? ""}
              className="flex-1 border rounded-lg px-3 py-2 bg-gray-100"
            />
            <button
              type="button"
              onClick={createManagerIdHandler}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900"
            >
              Generate
            </button>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          name="formSubmit"
          className="mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
