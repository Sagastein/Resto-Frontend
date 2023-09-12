import {
  AreaChart,
  BadgeDelta,
  Card,
  Divider,
  Flex,
  Metric,
  ProgressBar,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Text,
} from "@tremor/react";

function Chart() {
  const chartdata = [
    {
      date: "Jan 22",
      Credit: 2890,
      Debit: 2338,
    },
    {
      date: "Feb 22",
      Credit: 2756,
      Debit: 2103,
    },
    {
      date: "Mar 22",
      Credit: 3322,
      Debit: 2194,
    },
    {
      date: "Apr 22",
      Credit: 3470,
      Debit: 2108,
    },
    {
      date: "May 22",
      Credit: 3475,
      Debit: 1812,
    },
    {
      date: "Jun 22",
      Credit: 3129,
      Debit: 1726,
    },
  ];

  const dataFormatter = (number) => {
    return "RWF " + Intl.NumberFormat("us").format(number).toString();
  };

  return (
    <main className="bg-slate-50  border overflow-y-auto rounded">
      <Card className="p-4">
        <Flex justifyContent="between" alignItems="center">
          <Metric className="text-2xl capitalize">Income Statement</Metric>
          <BadgeDelta
            deltaType="moderateIncrease"
            isIncreasePositive={true}
            size="xs"
          >
            +12.3%
          </BadgeDelta>
        </Flex>
        <Metric className="inline">40,456 Frw</Metric>
        <span className="capitalize">Debit</span>
        <Divider />
        <AreaChart
          className="bg-white"
          data={chartdata}
          index="date"
          categories={["Debit", "Credit"]}
          colors={["indigo", "cyan"]}
          valueFormatter={dataFormatter}
          showXAxis={true}
          showYAxis={false}
          startEndOnly={false}
          showGridLines={true}
          showLegend={false}
        />
        <Divider />
        <TabGroup>
          <TabList className="mt-8">
            <Tab>Today</Tab>
            <Tab>Weekly</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <div className="mt-10">
                <Flex className="mt-4">
                  <Text className="w-full">Debit</Text>
                  <Flex className="space-x-2" justifyContent="end">
                    <Text>1,799 &bull;</Text>
                    <Text>98%</Text>
                  </Flex>
                </Flex>
                <ProgressBar value={98} className="mt-2" />
              </div>
              <div className="mt-10">
                <Flex className="mt-4">
                  <Text className="w-full">Credit</Text>
                  <Flex className="space-x-2" justifyContent="end">
                    <Text>14 &bull;</Text>
                    <Text>28%</Text>
                  </Flex>
                </Flex>
                <ProgressBar value={2} color="red" className="mt-2" />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="mt-10">
                <Flex className="mt-4">
                  <Text className="w-full">Debit</Text>
                  <Flex className="space-x-2" justifyContent="end">
                    <Text>7,799 &bull;</Text>
                    <Text>94%</Text>
                  </Flex>
                </Flex>
                <ProgressBar value={94} className="mt-2" />
              </div>
              <div className="mt-10">
                <Flex className="mt-4">
                  <Text className="w-full">Debit</Text>
                  <Flex className="space-x-2" justifyContent="end">
                    <Text>102 &bull;</Text>
                    <Text>8%</Text>
                  </Flex>
                </Flex>
                <ProgressBar value={8} color="red" className="mt-2" />
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </Card>
    </main>
  );
}

export default Chart;
