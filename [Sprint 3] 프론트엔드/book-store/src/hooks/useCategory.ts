import { useEffect, useState } from "react";
import { fetchCategory } from "../api/category.api";
import { Category } from "../models/category.model";

export const useCategory = () => {
  const [category, setCategory] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategory().then((category) => {
      if (!category) {
        return;
      }
      const categoryAll = [{ id: null, name: "전체" }, ...category];
      setCategory(categoryAll);
    });
  }, []);

  return category;
};
