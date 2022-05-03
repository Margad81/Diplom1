import React, { useState } from "react";
import items from "./data/items.json";
import _ from "lodash";
import { Checkbox } from "antd";

const App = () => {
  const options = [
    {
      label: "Нэрээр",
      value: "title",
    },
    {
      label: "Категиороор",
      value: "category",
    },
  ];
  const [searchData, setSearchData] = useState("");
  const [data, setData] = useState(items);
  const [selectedOption, setSelectedOption] = useState(options[0].value);
  const category = items.map((z) => z.category);
  const brand = items.map((z) => z.brand);
  const color = items.map((z) => z.color);
  const listCategory = _.uniq(category);
  const brandCategory = _.uniq(brand);
  const listColor = _.uniq(color);

  function onChange(checkedValues) {
    checkedValues.length > 0
      ? setData(
          items.filter((item) =>
            checkedValues.some((k) => item.category.indexOf(k) >= 0)
          )
        )
      : setData(items);
  }

  function onChangeBrand(checkedValues) {
    checkedValues.length > 0
      ? setData(
          items.filter((item) =>
            checkedValues.some((k) => item.brand.indexOf(k) >= 0)
          )
        )
      : setData(items);
  }

  function onChangeColor(checkedValues) {
    checkedValues.length > 0
      ? setData(
          items.filter((item) =>
            checkedValues.some((k) => item.color.indexOf(k) >= 0)
          )
        )
      : setData(items);
  }

  return (
    <div className="App">
      <div>
        <div className="px-10 border-b py-4 flex items-center">
          <div className="w-[20%]">
            <img src="/images/M-logo.png" alt="img" />
          </div>

          <div className="flex items-center w-[70%]">
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="border focus:outline-none h-[38px] rounded -mr-1"
            >
              {options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <input
              placeholder="Хайх утгаа оруулна уу"
              className="border rounded-l-none p-1.5 pl-5 w-full focus:outline-none rounded "
              onChange={(e) => setSearchData(e.target.value)}
            />
            <button className="bg-yellow-500 p-1.5 px-4 -ml-1 rounded border border-yellow-500">
              Хайх
            </button>
          </div>
        </div>

        <div className="px-2 md:px-10 py-10 md:flex">
          <div className="md:w-[15%]">
            <h1 className="text-lg font-bold">Категори</h1>

            <Checkbox.Group
              options={listCategory}
              onChange={onChange}
              className="flex flex-col"
            />

            <h1 className="text-lg font-bold mt-3">Брэнд</h1>

            <Checkbox.Group
              options={brandCategory}
              onChange={onChangeBrand}
              className="flex flex-col"
            />

            <h1 className="text-lg font-bold mt-3">Өнгө</h1>

            <Checkbox.Group
              options={listColor}
              onChange={onChangeColor}
              className="flex flex-col"
            />
          </div>

          <div className="">
            <section class="text-gray-600 body-font">
              <div class="container px-5 pb-10 mx-auto">
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {[...data]
                    .reverse()
                    .filter(
                      (item) =>
                        item[selectedOption]
                          .toLowerCase()
                          .indexOf(searchData.toLowerCase()) > -1
                    )
                    .map((item) => (
                      <div class="p-2">
                        <div class="h-full rounded-xl shadow-cla-blue bg-gradient-to-r from-indigo-50 to-blue-50 overflow-hidden">
                          <img
                            class="lg:h-48 md:h-36 w-full object-cover object-center scale-110 transition-all duration-400 hover:scale-100"
                            src={item.img}
                            alt="product"
                          />
                          <div class="p-6">
                            <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                              {item.category}
                            </h2>
                            <h1 class="title-font text-lg font-medium text-gray-600 mb-3">
                              {item.title}
                            </h1>
                            <p class="leading-relaxed mb-3 font-bold text-lg">
                              <span>
                                {item.salePrice
                                  ? `${item.salePrice.toLocaleString()} ₮`
                                  : ""}
                              </span>
                              <span
                                className={
                                  item.salePrice
                                    ? "line-through ml-3 text-red-500"
                                    : ""
                                }
                              >
                                {item.price.toLocaleString()} ₮
                              </span>
                            </p>
                            <div class="flex items-center flex-wrap ">
                              <button class="bg-gradient-to-r from-cyan-400 to-blue-400 hover:scale-105 drop-shadow-md  shadow-cla-blue px-4 py-1 rounded-lg">
                                Харьцуулах
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="bg-gray-200 text-center lg:text-left">
          <div className="text-gray-700 text-center p-4">
            © 2022 Copyright:
            <a className="text-gray-800" href="index.js">
              Бүтээгдэхүүн хайлт
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
