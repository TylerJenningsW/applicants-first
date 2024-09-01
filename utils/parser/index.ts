import { Prisma } from "@prisma/client";
import { extractResumeFromSections } from "./extract-resume-from-sections";
import { groupLinesIntoSections } from "./group-lines-into-sections";
import { groupTextItemsIntoLines } from "./group-text-items-into-lines";
import { readPdf } from "./read-pdf";
import { Resume } from "../redux/types";

/**
 * Resume parser util that parses a resume from a resume pdf file
 *
 * Note: The parser algorithm only works for single column resume in English language
 */
export const parseResumeFromPdf = async (fileUrl: string): Promise<Prisma.JsonValue> => {
  try {
    // Step 1. Read a pdf resume file into text items to prepare for processing
    const textItems = await readPdf(fileUrl);

    // Step 2. Group text items into lines
    const lines = groupTextItemsIntoLines(textItems);

    // Step 3. Group lines into sections
    const sections = groupLinesIntoSections(lines);

    // Step 4. Extract resume from sections
    const resume: Resume = extractResumeFromSections(sections);

    // Convert the resume object to a JSON string and then parse it back to ensure it's a valid JSON value
    return JSON.parse(JSON.stringify(resume)) as Prisma.JsonValue;
  } catch (error) {
    console.error("Error parsing resume:", error);
    return null;
  }
};