"use client";

import { useTheme } from "next-themes";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";

export function AppearanceForm() {
  const { setTheme } = useTheme();

  return (
    <div className="space-y-8">
      <Field>
        <FieldContent>
          <FieldTitle>Theme</FieldTitle>
          <FieldDescription>
            Select the theme for the dashboard.
          </FieldDescription>
          <div className="grid max-w-md grid-cols-2 gap-8 pt-2">
            <button
              type="button"
              onClick={() => setTheme("light")}
              className={`[&:has([data-state=checked])>div]:border-primary cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md`}
            >
              <FieldLabel asChild className="cursor-pointer">
                <div>
                  <div className="border-muted hover:border-accent items-center rounded-md border-2 p-1 transition-colors group-data-[state=checked]/field-label:border-primary">
                    <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                      <div className="space-y-2 rounded-md bg-white p-2 shadow-xs">
                        <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                        <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                      </div>
                      <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-xs">
                        <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                        <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                      </div>
                      <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-xs">
                        <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                        <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                      </div>
                    </div>
                  </div>
                  <span className="block w-full p-2 text-center font-normal">
                    Light
                  </span>
                </div>
              </FieldLabel>
            </button>

            <button
              type="button"
              onClick={() => setTheme("dark")}
              className={`cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md`}
            >
              <FieldLabel asChild className="cursor-pointer">
                <div>
                  <div className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground items-center rounded-md border-2 p-1 transition-colors group-data-[state=checked]/field-label:border-primary">
                    <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                      <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-xs">
                        <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                        <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                      </div>
                      <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-xs">
                        <div className="h-4 w-4 rounded-full bg-slate-400" />
                        <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                      </div>
                      <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-xs">
                        <div className="h-4 w-4 rounded-full bg-slate-400" />
                        <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                      </div>
                    </div>
                  </div>
                  <span className="block w-full p-2 text-center font-normal">
                    Dark
                  </span>
                </div>
              </FieldLabel>
            </button>
          </div>
        </FieldContent>
      </Field>
    </div>
  );
}
