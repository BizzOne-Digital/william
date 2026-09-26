"use client";

import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/Button";

const KEY = "idz_age_ack";

const AGE_EVENT = "idz-age-update";

function subscribe(onStoreChange: () => void) {
  window.addEventListener(AGE_EVENT, onStoreChange);
  return () => window.removeEventListener(AGE_EVENT, onStoreChange);
}

function getSnapshot() {
  return localStorage.getItem(KEY) === "1";
}

function getServerSnapshot() {
  return true;
}

export function AgeGate() {
  const acknowledged = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (acknowledged) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-4 sm:items-center">
      <div
        className="glass-panel max-w-lg rounded-2xl p-6 shadow-2xl"
        role="dialog"
        aria-labelledby="age-title"
        aria-modal="true"
      >
        <h2 id="age-title" className="font-display text-xl font-semibold text-white">
          Adult acknowledgement
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          This site is intended for adults in Canada. By continuing, you confirm you are at least
          18 years of age. This acknowledgement does not replace product authorization, regulatory
          compliance, or payment provider approval.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button
            className="flex-1"
            onClick={() => {
              localStorage.setItem(KEY, "1");
              window.dispatchEvent(new Event(AGE_EVENT));
            }}
          >
            I am 18 or older — continue
          </Button>
          <Button variant="secondary" className="flex-1" href="https://www.google.com">
            Leave site
          </Button>
        </div>
      </div>
    </div>
  );
}
