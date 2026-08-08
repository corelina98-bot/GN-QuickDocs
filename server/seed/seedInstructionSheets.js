import dotenv from "dotenv";
import mongoose from "mongoose";
import PDFDocument from "pdfkit";
import InstructionSheet from "../models/InstructionSheet.js";
import { storeInstructionSheet } from "../services/gridfsService.js";

dotenv.config();

/**
 * Idempotent seed for service instruction-sheet PDFs.
 *
 * For each configured service it:
 *   1. Checks whether an InstructionSheet metadata record already exists.
 *   2. If it does NOT exist, generates a professional sample PDF (via pdfkit),
 *      stores the binary in MongoDB GridFS, and creates the metadata record.
 *   3. If it DOES exist, it leaves it untouched (no duplicates).
 *
 * Run with:  npm run seed
 * (from the /server directory)
 */

const sheets = [
  {
    serviceCategory: "identity-verification-certificates",
    service: "residence-certificate",
    originalName: "Residence Certificate Instruction Sheet.pdf",
    filename: "residence-certificate-instruction-sheet.pdf",
    description: "Instruction sheet for Residence Certificate",
    title: "Residence Certificate",
    subtitle: "(Padinchi Sahathikaya)",
    required: [
      "1. National Identity Card (NIC) - Original and copy. Birth Certificate may be accepted where applicable.",
      "2. Householder Register - Gaha Samagamuwa / Household List.",
      "3. Electoral Registry Details - Voter registration number/year.",
      "4. Proof of Residence - Electricity/Water utility bill OR Deed/Rent Agreement in the applicant's name.",
      "5. Passport-sized photographs - Where applicable (e.g. NIC/Passport verification).",
    ],
  },
  {
    serviceCategory: "identity-verification-certificates",
    service: "character-certificate",
    originalName: "Character Certificate Instruction Sheet.pdf",
    filename: "character-certificate-instruction-sheet.pdf",
    description: "Instruction sheet for Character Certificate",
    title: "Character Certificate",
    subtitle: "(Charitra Sahathikaya)",
    required: [
      "1. National Identity Card (NIC) - Original and copy.",
      "2. Residence Certificate or Householder Register entry confirming current residence.",
      "3. Police Clearance Report - Required for specific official submissions where applicable.",
      "4. Recommendation letter from employer or educational institution (if applicable).",
    ],
  },
  {
    serviceCategory: "identity-verification-certificates",
    service: "income-certificate",
    originalName: "Income Certificate Instruction Sheet.pdf",
    filename: "income-certificate-instruction-sheet.pdf",
    description: "Instruction sheet for Income Certificate",
    title: "Income Certificate",
    subtitle: "(Aadaya Sahathikaya)",
    required: [
      "1. National Identity Card (NIC) - Original and copy.",
      "2. Salary slips / Pay sheets - For formal sector workers.",
      "3. Certified bank statements - For self-employed / business applicants.",
      "4. Proof of dependents - Birth certificates of children, if applicable.",
    ],
  },
{
    serviceCategory: "identity-verification-certificates",
    service: "life-certificate",
    originalName: "Life Certificate Instruction Sheet.pdf",
    filename: "life-certificate-instruction-sheet.pdf",
    description: "Instruction sheet for Life Certificate",
    title: "Life Certificate",
    subtitle: "(Jiwathva Sitime Sahathikaya)",
    required: [
      "1. National Identity Card (NIC) - Original and copy.",
      "2. Pensioner Identity Card / Pension number details.",
      "3. Senior Citizen ID (if applicable).",
      "4. The person must appear in person - Or provide medical proof if bedridden.",
    ],
  },

  // ---- electoral-civil-registrations ----
  {
    serviceCategory: "electoral-civil-registrations",
    service: "voter-registration-electoral-roll",
    originalName: "Voter Registration & Electoral Roll Updating Instruction Sheet.pdf",
    filename: "voter-registration-electoral-roll-instruction-sheet.pdf",
    description: "Instruction sheet for Voter Registration & Electoral Roll Updating",
    title: "Voter Registration",
    subtitle: "(Electoral Roll Updating)",
    required: [
      "1. National Identity Card (NIC) - Original and copy.",
      "2. Birth Certificate.",
      "3. Householder Register details.",
      "4. Proof of residency for at least 1 year at the current address (e.g. Deed or utility bill).",
    ],
  },
  {
    serviceCategory: "electoral-civil-registrations",
    service: "verification-birth-death-marriage",
    originalName: "Verification for Birth, Death, or Marriage Registration Instruction Sheet.pdf",
    filename: "verification-birth-death-marriage-instruction-sheet.pdf",
    description: "Instruction sheet for Verification for Birth, Death, or Marriage Registration",
    title: "Verification for Birth, Death, or Marriage",
    subtitle: "(Registration)",
    required: [
      "1. For Birth: Hospital birth notification card, Parents' Marriage Certificate, Parents' NICs.",
      "2. For Death: Hospital/Medical Cause of Death Certificate, Deceased's NIC.",
      "3. For Marriage: NICs and Birth Certificates of both parties.",
    ],
  },

  // ---- land-permits-local-industry ----
  {
    serviceCategory: "land-permits-local-industry",
    service: "tree-felling-timber-transport",
    originalName: "Tree Felling & Timber Transport Permits Instruction Sheet.pdf",
    filename: "tree-felling-timber-transport-instruction-sheet.pdf",
    description: "Instruction sheet for Tree Felling & Timber Transport Permits",
    title: "Tree Felling & Timber Transport Permits",
    subtitle: "(Land, Permits & Local Industry)",
    required: [
      "1. Land Deed / Grant Deed (Sinnakkara Deed) or Survey Plan.",
      "2. Applicant's National Identity Card (NIC).",
      "3. Boundaries declaration & neighbor consent statements (if close to boundary).",
      "4. Timber cutting permit (if requesting transport permit).",
    ],
  },
  {
    serviceCategory: "land-permits-local-industry",
    service: "animal-cattle-transport",
    originalName: "Animal & Cattle Transport Permits Instruction Sheet.pdf",
    filename: "animal-cattle-transport-instruction-sheet.pdf",
    description: "Instruction sheet for Animal & Cattle Transport Permits",
    title: "Animal & Cattle Transport Permits",
    subtitle: "(Land, Permits & Local Industry)",
    required: [
      "1. Proof of livestock ownership / Farm registration.",
      "2. Veterinary Health Certificate for animals.",
      "3. Transportation vehicle details and destination address.",
    ],
  },
  {
    serviceCategory: "land-permits-local-industry",
    service: "event-public-loudspeaker",
    originalName: "Event & Public Loudspeaker Approvals Instruction Sheet.pdf",
    filename: "event-public-loudspeaker-instruction-sheet.pdf",
    description: "Instruction sheet for Event & Public Loudspeaker Approvals",
    title: "Event & Public Loudspeaker Approvals",
    subtitle: "(Land, Permits & Local Industry)",
    required: [
      "1. Written application detailing event date, time, and venue.",
      "2. Applicant's National Identity Card (NIC).",
      "3. Venue owner's consent letter.",
      "4. Police station notification copy.",
    ],
  },

  // ---- welfare-social-relief ----
  {
    serviceCategory: "welfare-social-relief",
    service: "social-welfare-application",
    originalName: "Social Welfare Application Verification Instruction Sheet.pdf",
    filename: "social-welfare-application-instruction-sheet.pdf",
    description: "Instruction sheet for Social Welfare Application Verification",
    title: "Social Welfare Application Verification",
    subtitle: "(Aswesuma, Pensions, Disability)",
    required: [
      "1. Applicant & family members' NIC copies.",
      "2. Birth Certificates of dependents.",
      "3. Medical reports/certificates (for disability or chronic illness aid).",
      "4. Proof of income or unemployment declaration.",
    ],
  },
  {
    serviceCategory: "welfare-social-relief",
    service: "disaster-compensation-damage",
    originalName: "Disaster Compensation & Damage Assessment Instruction Sheet.pdf",
    filename: "disaster-compensation-damage-instruction-sheet.pdf",
    description: "Instruction sheet for Disaster Compensation & Damage Assessment",
    title: "Disaster Compensation",
    subtitle: "(Damage Assessment)",
    required: [
      "1. National Identity Card (NIC).",
      "2. Photos of structural or agricultural damage.",
      "3. Property deed or residency proof.",
      "4. Police entry report (for fires or human-made accidents).",
    ],
  },
];

/**
 * Generate a professional-looking sample instruction-sheet PDF.
 * Clearly marked as a SAMPLE / DEVELOPMENT document.
 *
 * @param {Object} content { title, subtitle, required[] }
 * @returns {Promise<Buffer>}
 */
async function buildPdf({ title, subtitle, required }) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50, size: "A4" });
    const chunks = [];
    doc.on("data", (c) => chunks.push(c));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const teal = "#0d5560";
    const ink = "#1f2d30";

    // Header band
    doc.rect(0, 0, doc.page.width, 90).fill("#d7f3f4");
    doc
      .fillColor(teal)
      .font("Helvetica-Bold")
      .fontSize(22)
      .text(title, 50, 28, { align: "center" });
    doc
      .font("Helvetica")
      .fontSize(13)
      .fillColor(ink)
      .text(subtitle, 50, 56, { align: "center", italic: true });

    // Subtitle
    doc
      .fillColor(teal)
      .font("Helvetica-Bold")
      .fontSize(15)
      .text("Instruction Sheet", 50, 120);
    doc
      .moveTo(50, 136)
      .lineTo(doc.page.width - 50, 136)
      .strokeColor(teal)
      .lineWidth(1.5)
      .stroke();

    // SAMPLE banner
    doc
      .fillColor("#b45309")
      .font("Helvetica-Bold")
      .fontSize(11)
      .text(
        "SAMPLE / DEVELOPMENT DOCUMENT - NOT AN OFFICIAL GOVERNMENT FORM",
        50,
        150,
        { align: "center" }
      );

    // Required Documents
    let y = 180;
    doc
      .fillColor(teal)
      .font("Helvetica-Bold")
      .fontSize(13)
      .text("1. Required Documents", 50, y);
    y += 22;

    doc.font("Helvetica").fontSize(11).fillColor(ink);
    required.forEach((line) => {
      doc.text(line, 50, y, { width: doc.page.width - 100 });
      y = doc.y + 8;
    });

    y = doc.y + 12;

    // Application Guidance
    doc
      .fillColor(teal)
      .font("Helvetica-Bold")
      .fontSize(13)
      .text("2. Application Guidance", 50, y);
    y = doc.y + 22;

    doc
      .font("Helvetica")
      .fontSize(11)
      .fillColor(ink)
      .text(
        "Applicants should bring the required original documents along with copies and " +
          "verify the exact requirements with the relevant authority before submitting the " +
          "application. Please contact the Grama Niladhari office for current procedures, " +
          "fees (if any), and appointment availability.",
        50,
        y,
        { width: doc.page.width - 100 }
      );

    // Footer note
    doc
      .fillColor("#6b7280")
      .font("Helvetica-Oblique")
      .fontSize(9)
      .text(
        "This is a sample instruction sheet generated for development/testing only. " +
          "It is not an official document of any government authority.",
        50,
        doc.page.height - 60,
        { width: doc.page.width - 100, align: "center" }
      );

    doc.end();
  });
}

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected (seed)");

    for (const sheet of sheets) {
      const exists = await InstructionSheet.findOne({ service: sheet.service });
      if (exists) {
        console.log(
          `✔ Instruction sheet already exists for "${sheet.service}" - skipping (no duplicate).`
        );
        continue;
      }

      console.log(`Generating sample PDF for "${sheet.service}"...`);
      const buffer = await buildPdf(sheet);

      const fileId = await storeInstructionSheet(buffer, {
        filename: sheet.filename,
        contentType: "application/pdf",
      });

      await InstructionSheet.create({
        filename: sheet.filename,
        originalName: sheet.originalName,
        contentType: "application/pdf",
        service: sheet.service,
        serviceCategory: sheet.serviceCategory,
        description: sheet.description,
        fileSize: buffer.length,
        fileId,
      });

      console.log(`✔ Stored "${sheet.filename}" (${buffer.length} bytes) in GridFS.`);
    }

    console.log("Seed complete.");
  } catch (error) {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();
