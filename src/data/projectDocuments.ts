export type ProjectDocumentSize = "Small" | "Medium" | "Large";

export interface ProjectDocument {
  name: string;
  date: string;
  size: ProjectDocumentSize;
  kind: string;
  summary: string;
}

export const PROJECT_DOCUMENTS: ProjectDocument[] = [
  {
    name: "AuTurn",
    date: "Apr 18, 2025",
    size: "Large",
    kind: "Robotics",
    summary:
      "co designed, engineered, and patented the real time tracking phone stand iterated the full control app and API all the way from idea to launch.",
  },
  {
    name: "Askie",
    date: "Mar 02, 2025",
    size: "Large",
    kind: "Reconfigurable Hardware",
    summary:
      "Building runtime reconfigurable chiplets that deliver near ASIC performance without the ASIC cost. More on this on Research",
  },
  {
    name: "Microsoft",
    date: "Jan 27, 2025",
    size: "Large",
    kind: "Product & AI",
    summary:
      "At Microsoft Accelerator I worked on  the long-form creator tool that started as a tool with 20 users  later shipped as Outlooks newsletters with millions of users, and on Teams Mobile I led the Copilot compose/rewrite experience among other things.",
  },
  {
    name: "Cable Facilitator Machine",
    date: "2023",
    size: "Small",
    kind: "Personal Build",
    summary:
      "Built the rig my dad’s crews use to push fiber through backyard conduits cuts installs from seven minutes to under forty five seconds.",
  },
];
