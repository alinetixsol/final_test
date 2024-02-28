import { useEffect, useState } from "react";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import dynamic from "next/dynamic";
import Link from "next/link";
import Giphy from "../public/assets/images/giphy2.gif";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface CountryData {
  participants: string;
  replies_count: number;
  published: string;
  date: string;
}
interface ChartOptions {
  series: { name: any; data: (any | any)[] }[];
  options: {
    chart: {
      type: any;
    };
    dataLabels: {
      enabled: any;
    };
    grid: {
      strokeDashArray: any;
      borderColor: any;
    };
    stroke: {
      curve: any;
      width: number;
    };
    xaxis: {
      categories: string[];
    };
  };
}

const SalesChart: React.FC = () => {
  const [countriesData, setCountriesData] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3009/news/aggregateByDate"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch blog data");
      }
      const data: CountryData[] = await response.json();
      setCountriesData(data);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  // console.log("countries : ", countriesData);

  const chartoptions: ChartOptions = {
    series: [
      {
        name: "Participants Count",
        data: countriesData.map((participants) => {
          return participants.participants;
        }),
      },
      {
        name: "Replies Count",
        data: countriesData.map((replies) => {
          return replies.replies_count;
        }),
      },
    ],
    options: {
      chart: {
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        strokeDashArray: 3,
        borderColor: "rgba(0,0,0,0.1)",
      },
      stroke: {
        curve: "smooth",
        width: 1,
      },
      xaxis: {
        categories: countriesData.map((date) => date.date),
      },
    },
  };

  return (
    <div>
      <Link
        href="/graph"
        className="nav-link text-black font-extrabold text-3xl"
      >
        <div className="mb-6"> SalesChart Graph</div>
      </Link>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Sales Summary</CardTitle>
          <CardSubtitle className="text-muted" tag="h6">
            Yearly Sales Report
          </CardSubtitle>
          {loading ? (
            <div className="flex justify-center items-center">
              <img src={Giphy.src} alt="" />
            </div>
          ) : (
            <Chart
              type="area"
              width="100%"
              height="390"
              options={chartoptions.options}
              series={chartoptions.series}
            />
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default SalesChart;
