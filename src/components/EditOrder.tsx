"use client";

import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

// Схема валидации
const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Название должно содержать минимум 3 символа!" })
    .max(100, { message: "Название не должно превышать 100 символов!" }),
  user: z
    .string()
    .min(2, { message: "Имя клиента должно содержать минимум 2 символа!" })
    .max(50, { message: "Имя клиента не должно превышать 50 символов!" }),
  status: z.enum(["new", "active", "inactive"], {
    errorMap: () => ({ message: "Выберите корректный статус!" }),
  }),
});

interface EditOrderProps {
  order: any;
}

const EditOrder = ({ order }: EditOrderProps) => {
  // Инициализация формы с данными заказа
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: order.title,
      user: order.user,
      status: order.status,
    },
  });

  // Функция отправки формы
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Здесь логика сохранения изменений
    console.log("Данные формы:", values);
    console.log("ID заказа:", order.id);

    // Показать сообщение об успехе
    alert("Изменения сохранены!");
  }

  // Функция для отображения текста статуса
  const getStatusText = (status: string) => {
    switch (status) {
      case "new":
        return "Новый";
      case "active":
        return "Активный";
      case "inactive":
        return "Неактивный";
      default:
        return status;
    }
  };

  return (
    <SheetContent className="p-0 overflow-hidden">
      <SheetHeader>
        <SheetTitle className="mb-2">Редактировать заказ</SheetTitle>
      </SheetHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="px-6 py-6 space-y-6"
        >
          {/* ID заказа (только для чтения) */}
          <div className="space-y-2">
            <FormLabel>ID заказа</FormLabel>
            <Input value={order.id} disabled className="bg-muted" />
            <FormDescription>
              Уникальный идентификатор заказа. Не может быть изменен.
            </FormDescription>
          </div>

          {/* Название заказа */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Название заказа</FormLabel>
                <FormControl>
                  <Input placeholder="Введите название заказа" {...field} />
                </FormControl>
                <FormDescription>
                  Краткое и понятное описание заказа.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Клиент */}
          <FormField
            control={form.control}
            name="user"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Клиент</FormLabel>
                <FormControl>
                  <Input placeholder="Введите имя клиента" {...field} />
                </FormControl>
                <FormDescription>
                  ФИО или название компании клиента.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Статус */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Статус заказа</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите статус" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="new">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span>{getStatusText("new")}</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="active">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span>{getStatusText("active")}</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="inactive">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <span>{getStatusText("inactive")}</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Определяет текущий этап обработки заказа.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Кнопки действий */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? "Сохранение..."
                : "Сохранить изменения"}
            </Button>
          </div>
        </form>
      </Form>
    </SheetContent>
  );
};

export default EditOrder;
