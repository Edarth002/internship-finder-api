import { PrismaClient } from "@prisma/client";
import fs, { writeFileSync } from "fs";

if (process.env.CA_CERTIFICATE) {
  const caPath = "/temp/ca.pem";
  writeFileSync(caPath, process.env.CA_CERTIFICATE);
  process.env.NODE_EXTRA_CA_CERTS = caPath;
}

const prisma = new PrismaClient();

export default prisma;
