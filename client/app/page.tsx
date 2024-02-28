"use client";
import useAuth from "@/hooks/useAuth";
import Head from "next/head";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import Blog from "../components/Blog";
import Feeds from "../components/Feeds";
import ProjectTables from "../components/ProjectTable";
import SalesChart from "../components/SalesChart";
import TopCards from "../components/TopCards";

interface CountryData {
  participants: string;
  replies_count: number;
  published: string;
  date: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      item: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

const Home: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, token } = useAuth();

  const [open, setOpen] = useState(false);
  const [data, setData] = useState<CountryData[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages: number = 1000;

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  async function getData(page: number) {
    try {
      const res = await fetch(`http://localhost:3009/news/all?page=${page}`);
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data: CountryData[] = await res.json();

      setData(data);
    } catch (error) {
      console.error(error);
    }
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  function renderPageNumbers() {
    const pageNumbers: JSX.Element[] = [];
    const maxPageNumbersToShow: number = 5;
    const halfMaxPageNumbersToShow: number = Math.floor(
      maxPageNumbersToShow / 2
    );
    const firstPageNumber: number = Math.max(
      1,
      currentPage - halfMaxPageNumbersToShow
    );
    const lastPageNumber: number = Math.min(
      totalPages,
      firstPageNumber + maxPageNumbersToShow - 1
    );

    for (let i = firstPageNumber; i <= lastPageNumber; i++) {
      pageNumbers.push(
        <li key={i}>
          <div
            className={`flex cursor-pointer items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 ${
              i === currentPage ? "font-bold" : ""
            }`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </div>
        </li>
      );
    }

    if (firstPageNumber > 1) {
      pageNumbers.unshift(
        <li key="ellipsis-before">
          <span className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300">
            ...
          </span>
        </li>
      );
    }

    if (lastPageNumber < totalPages) {
      pageNumbers.push(
        <li key="ellipsis-after">
          <span className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300">
            ...
          </span>
        </li>
      );
    }

    return pageNumbers;
  }

  return (
    <div>
      {token === false ? (
        `${router.push("signup")}`
      ) : (
        <div className="pageWrapper d-md-block d-lg-flex">
          <div className="contenArea w-full">
            <div>
              <Head>
                <meta
                  name="description"
                  content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
              </Head>
              <div className="m-4 ">
                <Row>
                  <Col sm="6" lg="3">
                    <TopCards
                      bg="bg-light-success text-success"
                      subtitle="Total Articles"
                      earning="2665"
                      icon="bi bi-wallet"
                    />
                  </Col>
                  <Col sm="6" lg="3">
                    <TopCards
                      bg="bg-light-danger text-danger"
                      subtitle="Total Languages"
                      earning="15"
                      icon="bi bi-coin"
                    />
                  </Col>
                  <Col sm="6" lg="3">
                    <TopCards
                      bg="bg-light-warning text-warning"
                      subtitle="Total Countries"
                      earning="13"
                      icon="bi bi-basket3"
                    />
                  </Col>
                  <Col sm="6" lg="3">
                    <TopCards
                      bg="bg-light-info text-into"
                      subtitle="Total Source"
                      earning="50"
                      icon="bi bi-bag"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col sm="12" lg="12" xl="12" xxl="12">
                    <SalesChart />
                  </Col>
                </Row>
                <Row>
                  <Col sm="12" lg="12" xl="12" xxl="12">
                    <Feeds />
                  </Col>
                </Row>
                <Row>
                  <Col lg="12" sm="12">
                    <ProjectTables />
                  </Col>
                </Row>
                <Row>
                  {data.length !== 0
                    ? data.map((news) => (
                        <Col sm="6" lg="6" xl="3" key={news.title}>
                          <Blog
                            id={news._id}
                            image={news.main_img_url}
                            title={news.title}
                            subtitle={news.text}
                            text={news.text}
                            color={news.primary}
                          />
                        </Col>
                      ))
                    : ""}
                  <div>
                    <nav aria-label="Page navigation overflow-hidden example">
                      <ul className="flex items-center  -space-x-px h-10 text-base">
                        <li>
                          <div
                            className="flex cursor-pointer items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                          >
                            <span className="sr-only">Previous</span>
                            <svg
                              className="w-3 h-3 rtl:rotate-180"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 6 10"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 1 1 5l4 4"
                              />
                            </svg>
                          </div>
                        </li>
                        {renderPageNumbers()}
                        <li>
                          <div
                            className="flex cursor-pointer items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                          >
                            <span className="sr-only">Next</span>
                            <svg
                              className="w-3 h-3 rtl:rotate-180"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 6 10"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 9 4-4-4-4"
                              />
                            </svg>
                          </div>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Row>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
