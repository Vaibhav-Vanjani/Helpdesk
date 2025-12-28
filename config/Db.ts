import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from 'pg';
import 'dotenv/config';

console.log("Inside Db.ts");

const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({connectionString});
const adapter = new PrismaPg(pool);

function SingletonPrisma(){
    console.log("Prisma DB client connected.");
    return new PrismaClient({adapter});
}

declare global{
    var prisma : PrismaClient | undefined;
}

export const prisma = globalThis.prisma ?? SingletonPrisma();

if(process.env.NODE_ENV !== 'production')globalThis.prisma = prisma;