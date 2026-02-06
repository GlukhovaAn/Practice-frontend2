import AppBarChart from "@/components/AppBarChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Package, DollarSign } from "lucide-react";

const Homepage = () => {
  const stats = {
    totalOrders: 1248,
    revenue: "$48,560",
    activeClients: 342,
    growthRate: "+12.5%",
  };

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div className="mb-6 px-4 py-2 bg-secondary rounded-md">
        <h1 className="text-xl font-semibold">Панель управления</h1>
        <p className="text-sm text-muted-foreground">
          Обзор статистики и аналитика
        </p>
      </div>

      {/* Виджеты статистики */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Общее количество заказов */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Всего заказов</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalOrders.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stats.growthRate} за месяц
              </span>
            </p>
          </CardContent>
        </Card>

        {/* Выручка */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Общая выручка</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.revenue}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stats.growthRate} с прошлого месяца
              </span>
            </p>
          </CardContent>
        </Card>

        {/* Активные клиенты */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Активные клиенты
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeClients}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+18</span> за последнюю неделю
            </p>
          </CardContent>
        </Card>

        {/* Средний чек */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Средний чек</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$128.50</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+$12.40</span> рост
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
        <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
          <AppBarChart />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
