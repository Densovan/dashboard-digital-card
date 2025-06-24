export interface IDashboardResponse {
  data: {
    summary: [
      {
        title: string;
        value: number;
        icon: string;
      }
    ];
    userGrowth: [
      {
        date: string;
        count: number;
      }
    ];
  };
}
