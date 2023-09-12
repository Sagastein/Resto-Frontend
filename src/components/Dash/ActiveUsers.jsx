import { Card, Metric, Text, CategoryBar, Legend } from "@tremor/react";

const ActiveUsers = () => (
 <Card className="max-w-md mx-auto">
    <Text>Total Users</Text>
    <Metric>10,483</Metric>
    <CategoryBar className="mt-4 w-full" values={[11, 2]} colors={["emerald", "red"]} />
    <Legend
      className="mt-3"
      categories={["Active users", "Inactive users"]}
      colors={["emerald", "red"]}
    />
  </Card>
);

export default ActiveUsers;
