import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Button } from "./Button";
import { TextField } from "./TextField";
import { useState } from "react";

export const AddFrom = () => {
  const [name, setName] = useState("");
  const [company, setCompnay] = useState("");
  const [article, setArticle] = useState("");
  const [rating, setRating] = useState("");
  const [price, setPrice] = useState("");

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="w-36.75 rounded-md h-full">
            <div className="flex gap-3.75 m-auto justify-center">
              <img src="/add.svg" />
              <span className="font-semibold text-sm">Добавить</span>
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="  ">
          <DialogHeader>
            <DialogTitle>Добавить продукт</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 w-100 h-150">
            <TextField
              labelClassName="font-normal text-sm text-gray-500 mb-0"
              fieldClassName="py-1.5"
              inputClassName="font-normal text-sm"
              label="Наименование"
              value={name}
              onChange={setName}
            />
            <TextField
              labelClassName="font-normal text-sm text-gray-500 mb-0"
              fieldClassName="py-1.5"
              inputClassName="font-normal text-sm"
              label="Вендор"
              value={company}
              onChange={setCompnay}
            />
            <TextField
              labelClassName="font-normal text-sm text-gray-500 mb-0"
              fieldClassName="py-1.5"
              inputClassName="font-normal text-sm"
              label="Артикул"
              value={article}
              onChange={setArticle}
            />
            <TextField
              labelClassName="font-normal text-sm text-gray-500 mb-0"
              fieldClassName="py-1.5"
              inputClassName="font-normal text-sm"
              label="Оценка"
              value={rating}
              onChange={setRating}
            />
            <TextField
              labelClassName="font-normal text-sm text-gray-500 mb-0"
              fieldClassName="py-1.5"
              inputClassName="font-normal text-sm"
              label="Цена, $"
              value={price}
              onChange={setPrice}
            />
          </div>
          <DialogFooter className="">
            <DialogClose asChild>
              <Button className="text-sm w-30 p-2">Отмена</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                onClick={() => {
                  toast.success("Новый продукт успешно создан!");
                }}
                className="text-sm w-30 p-2"
              >
                Сохранить
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
