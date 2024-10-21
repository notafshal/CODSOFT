"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaArrowDown, FaArrowUp, FaFilter } from "react-icons/fa";

import { Slider } from "@/components/ui/slider";
import Search from "./Search";
import axios from "axios";
import { useEffect, useState } from "react";

import { Button } from "./ui/button";

import Link from "next/link";

interface Filtration {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _id: any;
  author: string;
  category: string;
}

const Filter = () => {
  const [selectFilter, setSelectFilter] = useState<Filtration[] | undefined>(
    []
  );

  const [authorisClick, setauthorisClick] = useState<boolean>(false);
  const [categoryisClick, setcategoryisClick] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/product")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((result: any) => {
        setSelectFilter(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const authorMap = new Map();

  selectFilter?.forEach((item) => {
    if (!authorMap.has(item.author)) {
      authorMap.set(item.author, item._id);
    }
  });
  const categoryMap = new Map();

  selectFilter?.forEach((item) => {
    if (!categoryMap.has(item.category)) {
      categoryMap.set(item.category, item._id);
    }
  });
  const uniqueAuthors = Array.from(authorMap, ([author, id]) => ({
    author,
    id,
  }));

  const uniqueCategories = Array.from(categoryMap, ([category, id]) => ({
    category,
    id,
  }));
  console.log(uniqueAuthors);

  return (
    <>
      <Sheet>
        <SheetTrigger>
          <FaFilter />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="mx-6">
            <SheetTitle>What are you Looking For?</SheetTitle>
            <SheetDescription className="flex flex-col gap-4">
              <Search />
              <p>Price</p>
              <Slider defaultValue={[30]} max={100} step={1} />
              <Button onClick={() => setauthorisClick(!authorisClick)}>
                Select Author
                {!authorisClick ? (
                  <FaArrowDown className="mx-2" />
                ) : (
                  <FaArrowUp className="mx-2" />
                )}
              </Button>
              <div>
                {authorisClick &&
                  uniqueAuthors.map((item) => (
                    <>
                      <Link key={item.id} href={`filterpage/${item.id}`}>
                        <div className="p-1 hover:underline">{item.author}</div>
                      </Link>
                    </>
                  ))}
              </div>
              <Button onClick={() => setcategoryisClick(!categoryisClick)}>
                Select Genre
                {!categoryisClick ? (
                  <FaArrowDown className="mx-2" />
                ) : (
                  <FaArrowUp className="mx-2" />
                )}
              </Button>
              <div>
                {categoryisClick &&
                  uniqueCategories.map((item) => (
                    <>
                      <Link key={item.id} href={`filterpage/${item.id}`}>
                        <div className="p-1 hover:underline" key={item.id}>
                          {item.category}
                        </div>
                      </Link>
                    </>
                  ))}
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};
export default Filter;
