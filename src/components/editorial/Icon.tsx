type IconName = "diagonal" | "left" | "right" | "menu" | "close";

const paths: Record<IconName, string> = {
  diagonal: "M3 13 13 3M5 3h8v8",
  left: "M14 8H2m5-5L2 8l5 5",
  right: "M2 8h12M9 3l5 5-5 5",
  menu: "M2 4h12M2 8h12M2 12h12",
  close: "m3 3 10 10M13 3 3 13",
};

export function Icon({ name = "diagonal" }: { name?: IconName }) {
  return <svg className="vm-icon" viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d={paths[name]} /></svg>;
}
