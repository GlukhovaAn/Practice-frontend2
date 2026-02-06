"use client";

import { Progress } from "@/components/ui/progress";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import EditUser from "@/components/EditUser";
import { useParams } from "next/navigation";
import { ordersData } from "../data";
import { cn } from "@/lib/utils";
import EditOrder from "@/components/EditOrder";
import { useState } from "react";

// Функция для получения цвета статуса
const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-500/40 text-green-800";
    case "inactive":
      return "bg-red-500/40 text-red-800";
    case "new":
      return "bg-blue-500/40 text-blue-800";
    default:
      return "bg-gray-500/40 text-gray-800";
  }
};

// Функция для отображения статуса текстом
const getStatusText = (status: string) => {
  switch (status) {
    case "active":
      return "Активный";
    case "inactive":
      return "Неактивный";
    case "new":
      return "Новый";
    default:
      return status;
  }
};

// Расчет прогресса (примерная логика)
const getProgressValue = (status: string) => {
  switch (status) {
    case "new":
      return 25;
    case "active":
      return 75;
    case "inactive":
      return 100;
    default:
      return 0;
  }
};

const SingleOrderPage = () => {
  const params = useParams();
  const orderId = params.id as string;
  const order = ordersData.find((order: any) => order.id === orderId);
  const [isOpen, setIsOpen] = useState(false);

  if (!order) {
    <div>Не найдено</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Заказ #{order?.id}</h1>
          <p className="text-muted-foreground">Детальная информация о заказе</p>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button>Редактировать заказ</Button>
          </SheetTrigger>
          <EditOrder order={order} />
        </Sheet>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3 space-y-6">
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Информация о заказе</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">ID заказа</p>
                  <p className="font-medium">{order?.id}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Название заказа
                  </p>
                  <p className="font-medium">{order?.title}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Статус заказа</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-sm font-medium",
                        getStatusColor(order?.status || "")
                      )}
                    >
                      {getStatusText(order?.status || "")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Клиент</p>
                  <p className="font-medium">{order?.user}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Прогресс выполнения
                  </p>
                  <div className="mt-2">
                    <Progress value={getProgressValue(order?.status || "")} />
                    <p className="text-xs text-muted-foreground mt-1">
                      {getProgressValue(order?.status || "")}% завершено
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t">
              <h3 className="font-medium mb-3">Дополнительные детали</h3>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>Здесь может быть дополнительная информация о заказе.</p>
                <p>
                  Например: дата создания, сроки выполнения, описание и т.д.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrderPage;
