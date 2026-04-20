import { useEffect, useState } from "react";
import { Button } from "./Button";
import { ProductTable } from "./ProductTable";
import { TextField } from "./TextField";
import { getProducts } from "@/api";
import type { ProductResponse } from "@/api/types";
import { TablePagination } from "./TablePagination";
import { Spinner } from "./Spinner";
import { AddFrom } from "./AddFrom";
import type { SortConfig } from "@/lib/types";

export const ProductsPage = () => {
  const [result, setResult] = useState<ProductResponse>({});
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<SortConfig>(
    JSON.parse(
      localStorage.getItem("sort") ?? JSON.stringify({ order: "asc" }),
    ) as SortConfig,
  );

  const refrehList = (sort: SortConfig) => {
    getProducts(sort).then((response) => {
      if (response?.ok) {
        response.json().then((result) => {
          setResult(result);
        });
      }
    });
  };

  useEffect(() => {
    localStorage.setItem("sort", JSON.stringify(sort));
    refrehList(sort);
  }, [sort]);

  return (
    <div className="max-w-480 flex flex-col m-auto h-full">
      <div className="bg-white h-26.25 mt-[22.5px] mb-[32.5px] flex items-center">
        <div className="font-bold text-2xl ml-7.5">Товары</div>
        <TextField
          fieldClassName="px-5 rounded-lg bg-[#f3f3f3] max-w-[1023px] ml-[310px]"
          inputClassName="px-1 placeholder:font-normal placeholder:text-sm placeholder:absolute placeholder:top-0.5"
          placenolder="Найти"
          icon={<img src="/search.svg" />}
          value={search}
          onChange={setSearch}
          onClear={() => {
            setSearch("");
          }}
        />
      </div>
      <div className="bg-white w-full flex-1 p-7.5 flex flex-col gap-10 overflow-y-auto">
        <div className="flex items-center justify-between">
          <div className="font-bold text-xl">Все позиции</div>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                setResult({});
                setSort({ order: "asc" });
              }}
              className="bg-white border-[#ececeb] size-10.5 w-10.5 flex items-center justify-center rounded-lg"
            >
              <img src="/arrows.svg" />
            </Button>
            <AddFrom />
          </div>
        </div>
        {result.products ? (
          <>
            <ProductTable
              data={result.products}
              sort={sort}
              changeSort={setSort}
            />
            <div className="h-13 flex items-center justify-between">
              <div>
                <span className="text-[#969B9F] text-lg">
                  Показано <span className="text-black">1-20</span> из{" "}
                  <span className="text-black">{result.total ?? 0}</span>
                </span>
              </div>
              <TablePagination />
            </div>
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};
