import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "./CheckBox";
import { useState, type Dispatch, type FC } from "react";
import type { Product } from "@/api/types";
import { Button } from "./Button";
import { Sort } from "./Sort";
import type { SortConfig } from "@/lib/types";

interface Props {
  data: Product[];
  sort: SortConfig;
  changeSort: Dispatch<React.SetStateAction<SortConfig>>;
}

export const ProductTable: FC<Props> = ({ data, sort, changeSort }) => {
  const [checkedRows, setCheckedRows] = useState<number[]>([]);
  const allRowsId = Array(data.length)
    .fill(0)
    .map((_, i) => i);

  const selectRow = (n: number) => {
    setCheckedRows((p) => {
      const result = [...p];

      if (result.includes(n)) {
        return result.filter((id) => id !== n);
      } else {
        result.push(n);
        return result;
      }
    });
  };

  const selectAllRows = () => {
    setCheckedRows((p) => {
      if (p.length < data.length) return allRowsId;
      return [];
    });
  };

  const setSort = (key: string) => {
    changeSort((p) => {
      const order = p.order === "asc" ? "desc" : "asc";
      if (p.key === key) {
        return { key: p.order === "asc" ? key : undefined, order };
      } else {
        return { key, order: "asc" };
      }
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="p-4.5 border-l-[3px] border-transparent">
            <Checkbox
              checked={checkedRows.length === data.length}
              onChange={selectAllRows}
              classname="rounded-xs size-5.5"
            />
          </TableHead>
          <TableHead className="text-left">
            Наименование
            <Sort
              order={sort.key === "title" ? sort.order : "asc"}
              isActive={sort.key === "title"}
              onClick={() => setSort("title")}
            />
          </TableHead>
          <TableHead>
            Вендор
            <Sort
              order={sort.key === "brand" ? sort.order : "asc"}
              isActive={sort.key === "brand"}
              onClick={() => setSort("brand")}
            />
          </TableHead>
          <TableHead>
            Артикул
            <Sort
              order={sort.key === "sku" ? sort.order : "asc"}
              isActive={sort.key === "sku"}
              onClick={() => setSort("sku")}
            />
          </TableHead>
          <TableHead>
            Оценка
            <Sort
              order={sort.key === "rating" ? sort.order : "asc"}
              isActive={sort.key === "rating"}
              onClick={() => setSort("rating")}
            />
          </TableHead>
          <TableHead>
            Цена, $
            <Sort
              order={sort.key === "price" ? sort.order : "asc"}
              isActive={sort.key === "price"}
              onClick={() => setSort("price")}
            />
          </TableHead>
          <TableHead className="flex grow"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((product, i) => (
          <TableRow
            key={product.id}
            onClick={() => {
              selectRow(i);
            }}
            className="cursor-pointer border-l-[3px] border-l-transparent hover:border-l-[#3C538E] "
          >
            <TableCell className="w-14.5 p-4.5">
              <Checkbox
                checked={checkedRows.includes(i)}
                classname="rounded-xs size-5.5"
              />
            </TableCell>
            <TableCell className="font-medium text-left">
              <div className="flex gap-4.5 items-center">
                <img
                  className="border border-[#ececeb] rounded-lg size-12 "
                  src={product.images[0]}
                />
                <div className="w-52.5">
                  <div className="font-bold truncate">{product.title}</div>
                  <div className="text-sm text-[#B2B3B9]">
                    {product.category}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell className="font-bold">{product.brand}</TableCell>
            <TableCell>{product.sku}</TableCell>
            <TableCell
              style={{ color: product.rating < 3.5 ? "red" : "black" }}
            >
              {product.rating}
            </TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="flex px-[8.9px] justify-between m-auto w-33.25"
              >
                <Button className="w-13">+</Button>
                <img src="/dots.svg" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
