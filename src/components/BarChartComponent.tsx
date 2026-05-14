import {ResponsiveContainer,BarChart,Bar,XAxis,Tooltip, CartesianGrid,} from "recharts";

interface BarChartComponentProps {
  data: any[];
  xKey: string;
  vKey: string;
}

function BarChartComponent({ data, xKey, vKey }: BarChartComponentProps) {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <Tooltip />
          <Bar dataKey={vKey} fill="#4f46e5" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartComponent;
