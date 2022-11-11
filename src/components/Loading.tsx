import ProgressBar from "@badrap/bar-of-progress";
import { useEffect } from "react";

interface LodingProps {
  loading: boolean;
}

const progress = new ProgressBar({
  size: 4,
  color: "gray",
  className: "bar-of-progress",
  delay: 100,
});

export default function Loading({ loading }: LodingProps) {
  useEffect(() => {
    loading ? progress.start() : progress.finish();
  }, [loading]);

  return <div className="bg-transparent absolute"></div>;
}
