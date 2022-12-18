import React, { useState } from "react";
import {
  Aod,
  Code,
  ColorLens,
  KeyboardArrowRight,
  Laptop,
  OpenWith,
} from "@mui/icons-material";
import Accordion from "./components/Accordion";
import SelectionCard from "./components/SelectionCard";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import ColorPickerButton from "./components/ColorPicker";
import { InputNumber } from "antd";

const WidgetSettingPage = (props) => {
  const [maxWindow, setMaxWindow] = useState(false);
  const [minWindow, setMinWindow] = useState(false);
  const [lighttheme, setLightTheme] = useState(false);
  const [colorMode, setColorMode] = useState("theme");

  const [selectedColor, setSelectedColor] = useState("#2000F0");

  return (
    <div>
      <Accordion
        headerIcon={<Code />}
        headerName="Install LiveChat code manually"
      >
        <div className="px-[24px] py-[34px] flex flex-col items-start">
          Copy and paste this code before the closing {"<body/>"}
          tag on every page of your website.
          <div className="bg-gray-200 my-[8px] leading-8 flex flex-col items-start breadk-">
            <div>
              <p>{`<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/bluesky0724/livechat-widget/widget/index.css">`}</p>
            </div>
            <div className="flex flex-col items-start">
              <p>
                {`<script src="https://cdn.jsdelivr.net/gh/bluesky0724/livechat-widget/widget/index.js"></script>`}
              </p>
            </div>
            <div>
              <p>
                {`<script>
                window.__lc = window.__lc || {};
                window.__lc.license = "${props.schoolId}";
                </script>`}
              </p>
            </div>
          </div>
          <div>
            Or send your code to <a href="#">developers</a>
          </div>
        </div>
      </Accordion>
      <Accordion headerIcon={<ColorLens />} headerName="Appearance">
        <div className="px-4">
          <div className="flex flex-col items-start p-2">
            <p className="text-[12px] text-[#424D57]">MAXIMIZED WINDOW</p>
            <div className="flex flex-row">
              <SelectionCard
                selected={!maxWindow}
                onClick={(e) => setMaxWindow(false)}
                icon={
                  <svg viewBox="0 0 80 80" style={{ color: "#424d5799" }}>
                    <path
                      d="M32,17 L50,17 C52.209139,17 54,18.790861 54,21 L54,57 C54,59.209139 52.209139,61 50,61 L32,61 C29.790861,61 28,59.209139 28,57 L28,21 C28,18.790861 29.790861,17 32,17 Z M33.5,45 C32.6715729,45 32,45.6715729 32,46.5 C32,47.3284271 32.6715729,48 33.5,48 L43.5,48 C44.3284271,48 45,47.3284271 45,46.5 C45,45.6715729 44.3284271,45 43.5,45 L33.5,45 Z M33,24 C32.4477153,24 32,24.4477153 32,25 L32,41 C32,41.5522847 32.4477153,42 33,42 L49,42 C49.5522847,42 50,41.5522847 50,41 L50,25 C50,24.4477153 49.5522847,24 49,24 L33,24 Z M41.5,50 C40.6715729,50 40,50.6715729 40,51.5 C40,52.3284271 40.6715729,53 41.5,53 L48.5,53 C49.3284271,53 50,52.3284271 50,51.5 C50,50.6715729 49.3284271,50 48.5,50 L41.5,50 Z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                }
                content="Smooth"
              />
              <SelectionCard
                selected={maxWindow}
                onClick={(e) => setMaxWindow(true)}
                icon={
                  <svg viewBox="0 0 80 80">
                    <path
                      d="M57 57h9v2H14v-2h9V23a2 2 0 0 1 2-2h30a2 2 0 0 1 2 2v34zM26 29a1 1 0 0 0-1 1v26a1 1 0 0 0 1 1h28a1 1 0 0 0 1-1V30a1 1 0 0 0-1-1H26z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                }
                content="Modern"
              />
            </div>
          </div>
          <div className="flex flex-col items-start p-2">
            <p className="text-[12px] text-[#424D57]">MNIMIZED WINDOW</p>
            <div className="flex flex-row">
              <SelectionCard
                selected={!minWindow}
                onClick={(e) => setMinWindow(false)}
                icon={
                  <svg viewBox="0 0 80 80" style={{ color: "#424d5799" }}>
                    <path
                      d="M63,39.8999819 L63,46 L66,46 L66,48 L14,48 L14,46 L17,46 L17,38 C17,35.790861 18.790861,34 21,34 L57.1000181,34 C57.0344303,34.3231099 57,34.6575342 57,35 C57,37.7614237 59.2385763,40 62,40 C62.3424658,40 62.6768901,39.9655697 63,39.8999819 Z M62,38 C60.3431458,38 59,36.6568542 59,35 C59,33.3431458 60.3431458,32 62,32 C63.6568542,32 65,33.3431458 65,35 C65,36.6568542 63.6568542,38 62,38 Z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                }
                content="Bar"
              />
              <SelectionCard
                selected={minWindow}
                onClick={(e) => setMinWindow(true)}
                icon={
                  <svg viewBox="0 0 80 80">
                    <path
                      d="M44.5074471,27.8026741 C44.182457,28.4658851 44,29.211635 44,30 C44,32.7614237 46.2385763,35 49,35 C49.9758818,35 50.886465,34.7204238 51.6560244,34.2369967 C52.5163942,35.9738177 53,37.9304328 53,40 C53,47.1797017 47.1797017,53 40,53 C32.8202983,53 27,47.1797017 27,40 C27,32.8202983 32.8202983,27 40,27 C41.5846973,27 43.1031686,27.283547 44.5074471,27.8026741 Z M49,33 C47.3431458,33 46,31.6568542 46,30 C46,28.3431458 47.3431458,27 49,27 C50.6568542,27 52,28.3431458 52,30 C52,31.6568542 50.6568542,33 49,33 Z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                }
                content="Bubble"
              />
            </div>
          </div>
          <div className="flex flex-col items-start p-2">
            <p className="text-[16px] font-bold  text-[#424D57]">
              Theme and colors
            </p>
            <div className="flex flex-row">
              <SelectionCard
                selected={!lighttheme}
                onClick={(e) => setLightTheme(false)}
                icon={
                  <svg viewBox="0 0 40 40" style={{ color: "#424d5799" }}>
                    <path
                      d="M20 29a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1Zm-6.667-2.333a.943.943 0 0 1 0 1.333L12 29.333A.943.943 0 1 1 10.667 28L12 26.667a.943.943 0 0 1 1.333 0Zm14.667 0L29.333 28A.943.943 0 1 1 28 29.333L26.667 28A.943.943 0 1 1 28 26.667ZM20 13a7 7 0 1 1 0 14 7 7 0 0 1 0-14Zm12 6a1 1 0 0 1 0 2h-2a1 1 0 0 1 0-2h2Zm-22 0a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2h2Zm19.333-8.333a.943.943 0 0 1 0 1.333L28 13.333A.943.943 0 1 1 26.667 12L28 10.667a.943.943 0 0 1 1.333 0Zm-17.333 0L13.333 12A.943.943 0 1 1 12 13.333L10.667 12A.943.943 0 1 1 12 10.667ZM20 7a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V8a1 1 0 0 1 1-1Z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                }
                content="Light"
              />
              <SelectionCard
                selected={lighttheme}
                onClick={(e) => setLightTheme(true)}
                icon={
                  <svg viewBox="0 0 40 40">
                    <path
                      className="h-8 y-8"
                      d="m18.995 10-.24.24c-.913.928-1.759 1.958-1.759 4.256 0 2.95 1.35 5.062 2.999 6.496 1.424 1.238 2.95 1.998 5.497 1.998 2.299 0 3.329-.845 4.257-1.759l.241-.24a.59.59 0 0 1 1.008.41v.426a1.663 1.663 0 0 1-.008.164c-.727 5.367-5.428 8.994-10.995 8.994C13.923 30.985 9 26.064 9 19.993 9 14.506 12.74 9.824 17.996 9c.076-.012.226-.017.45-.014l.142.002a.593.593 0 0 1 .407 1.011Z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                }
                content="Dark"
              />
            </div>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="theme"
                name="radio-buttons-group"
                onChange={(e) => setColorMode(e.target.value)}
              >
                <FormControlLabel
                  value="theme"
                  control={<Radio />}
                  label="Theme color"
                ></FormControlLabel>
                {colorMode === "theme" ? (
                  <div className="flex flex-row m-2">
                    <ColorPickerButton
                      onClick={(e) => setSelectedColor("#2000F0")}
                      color="#2000F0"
                      selectedColor={selectedColor}
                    />
                    <ColorPickerButton
                      onClick={(e) => setSelectedColor("#6F0FFF")}
                      color="#6F0FFF"
                      selectedColor={selectedColor}
                    />
                    <ColorPickerButton
                      onClick={(e) => setSelectedColor("#DA3807")}
                      color="#DA3807"
                      selectedColor={selectedColor}
                    />
                    <ColorPickerButton
                      onClick={(e) => setSelectedColor("#0F8524")}
                      color="#0F8524"
                      selectedColor={selectedColor}
                    />
                    <ColorPickerButton
                      onClick={(e) => setSelectedColor("#00796B")}
                      color="#00796B"
                      selectedColor={selectedColor}
                    />
                  </div>
                ) : null}
                <FormControlLabel
                  value="more"
                  control={<Radio />}
                  label="More color settings"
                />
                {<div></div>}
              </RadioGroup>
            </FormControl>
          </div>
        </div>
      </Accordion>
      <Accordion headerIcon={<OpenWith />} headerName="Position">
        <div className="p-[24px] flex flex-col items-start">
            <p className="text-[16px] font-bold  text-[#424D57]">
                Widget Position
            </p>
            <div className="flex flex-row items-left mx-4 mt-4">
                <div className="mr-8 flex flex-col items-start">
                    <p>Align to:</p>
                    <Select size="small" defaultValue={1}>
                        <MenuItem value={1}>Right</MenuItem>
                        <MenuItem value={2}>Left</MenuItem>
                    </Select>
                </div>
                <div className="mr-8 flex flex-col items-start">
                    <p>Side spacing:</p>
                    <InputNumber addonAfter="px" defaultValue={0} />
                </div>
                <div className="mr-8 flex flex-col items-start">
                    <p>Bottom spacing:</p>
                    <InputNumber addonAfter="px" defaultValue={0} />
                </div>
            </div>
        </div>
      </Accordion>
    </div>
  );
};

export default WidgetSettingPage;
