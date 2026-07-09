import { useMemo, useEffect } from "react";

export default function useFilePreview(file: File | null) {
  const imgSrc = useMemo(() => {
    if (file) {
      return URL.createObjectURL(file);
    }
    return null;
  }, [file]);

  useEffect(() => {
    return () => {
      if (imgSrc) URL.revokeObjectURL(imgSrc);
    };
  }, [imgSrc]);

  return [imgSrc];
}
