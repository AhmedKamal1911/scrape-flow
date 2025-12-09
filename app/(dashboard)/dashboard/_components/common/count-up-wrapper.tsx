"use client";

import { useEffect, useState } from "react";
import CountUp from "react-countup";
export default function CountUpWrapper({ value }: { value: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return "-";
  }
  return <CountUp duration={1.5} preserveValue end={value} decimal="0" />;
}
