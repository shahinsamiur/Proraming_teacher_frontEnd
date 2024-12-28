import React, { useContext } from "react";
import SelectComponent from "./select";
import { MyContext } from "../contextAPI";

export default function SettingEditor() {
  const {
    EditorSetting,
    setEditorSetting,
  } = useContext(MyContext);

  const handleCheckboxChange = (key) => {
    const updatedSettings = { ...EditorSetting, [key]: !EditorSetting[key] };
    setEditorSetting(updatedSettings);
    localStorage.setItem("editorSettings", JSON.stringify(updatedSettings));
  };

  const handleSelectChange = (key, value) => {
    const updatedSettings = { ...EditorSetting, [key]: value };
    setEditorSetting(updatedSettings);
    localStorage.setItem("editorSettings", JSON.stringify(updatedSettings));
  };

  const resetSettings = () => {
    const defaultSettings = {
      theme: "monokai",
      fontSize: 12,
      languageMode: "python",
      showGutter: true,
      showLineNumbers: false,
      enableBasicAutocomplete: false,
      enableLiveAutocomplete: false,
      showPrintMargin: false,
      highlightActiveLine: true,
      enableSnippets: false,
    };
    setEditorSetting(defaultSettings);
    localStorage.setItem("editorSettings", JSON.stringify(defaultSettings));
  };

  return (
    <div className="w-full h-full flex flex-col gap-[5%] p-3">
      {/* Theme */}
      <div className="w-full h-[8%] flex items-center justify-between border-b-[0.1vw] border-[#2C2C2C] p-2">
        <span className="text-left text-[0.9vw]">Theme</span>
        <SelectComponent
          selectedValue={EditorSetting.theme}
          options={[
            // { value: "Default", label: "Default" },
            { value: "monokai", label: "monokai" },
            { value: "tomorrow_night", label: "tomorrow_night" },
            { value: "dracula", label: "dracula" },
            { value: "twilight", label: "twilight" },
          ]}
          onChange={(value) => handleSelectChange("theme", value)}
        />
      </div>

      {/* Font Size */}
      <div className="w-full h-[8%] flex items-center justify-between border-b-[0.1vw] border-[#2C2C2C] p-2">
        <span className="text-left text-[0.9vw]">Font Size</span>
        <SelectComponent
          selectedValue={EditorSetting.fontSize}
          options={[
              { value: 12, label: 12 },
              { value: 14, label: 14 },
              { value: 16, label: 16 },
              { value: 18, label: 18 },
              { value: 20, label: 20 }
          ]}
          onChange={(value) => handleSelectChange("fontSize", value)}
        />
      </div>



            {/* Language Mode */}
            <div className="w-full h-[8%] flex items-center justify-between border-b-[0.1vw] border-[#2C2C2C] p-2">
                <span className="text-left text-[0.9vw]">Language Mode</span>
                <SelectComponent
                    selectedValue={EditorSetting.languageMode}
                    options={[
                        { value: "python", label: "python" },
                        { value: "java", label: "java" },
                        { value: "javascript", label: "javascript" },
                        { value: "php", label: "php" },
                    ]}
                    onChange={(value) => handleSelectChange("languageMode", value)}
                />
            </div>

            {/* Checkboxes */}
            <div className="w-full flex-1 flex flex-row gap-[1%] p-2">
                <div className="flex-1 flex flex-col gap-[10%]">
                    {[
                        { label: "Show Gutter", key: "showGutter" },
                        { label: "Show Line Numbers", key: "showLineNumbers" },
                        { label: "highlight Active Line ", key: "highlightActiveLine" },
                        { label: "Enable Live Autocomplete", key: "enableLiveAutocomplete" },
                    ].map(({ label, key }) => (
                        <div key={key} className="flex flex-row gap-2 text-[1.1vw]">
                            <input
                                type="checkbox"
                                checked={EditorSetting[key]}
                                onChange={() => handleCheckboxChange(key)}
                            />
                            <h1>{label}</h1>
                        </div>
                    ))}
                </div>
                {/* <div className="flex-1 flex flex-col gap-[10%]">
                    {[
                        { label: "Show Print Margin", key: "showPrintMargin" },
                        { label: "Highlight Active Line", key: "highlightActiveLine" },
                        { label: "Enable Snippets", key: "enableSnippets" },
                    ].map(({ label, key }) => (
                        <div key={key} className="flex flex-row gap-2 text-[1.1vw]">
                            <input
                                type="checkbox"
                                checked={EditorSetting[key]}
                                onChange={() => handleCheckboxChange(key)}
                            />
                            <h1>{label}</h1>
                        </div>
                    ))}
                </div> */}
            </div>

            {/* Reset Button */}
            <div className="flex-1 flex justify-start items-center h-[10%]">
                <button
                    onClick={resetSettings}
                    className="w-[10vw] h-[2.5vw] bg-[#08618E] rounded-lg text-[1vw] hover:bg-[#31B8D6]"
                >
                    Reset Editor
                </button>
            </div>
        </div>
    );
}
