import React, { useState } from "react";
import SelectComponent from "./select";
import { Checkbox, Label } from "keep-react";

export default function SettingEditor() {
    const [selectedTheme, setSelectedTheme] = React.useState("Default");
    const [selectedFont, setSelectedFont] = React.useState("Default");

    const options_theme = [
        { value: "Default", label: "Default" },
        { value: "github", label: "github" },
        { value: "tomorrow", label: "tomorrow" },
        { value: "darksolarized", label: "darksolarized" },
    ];

    const options_font = [
        { value: "Default", label: "Default" },
        { value: "14", label: "14" },
        { value: "16", label: "16" },
        { value: "18", label: "18" },
        { value: "20", label: "20" },
    ];



 




    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className="w-full h-full flex flex-col gap-[5%] p-3">
            {/* Theme */}
            {/* Font Size */}
            <div className="w-full h-[8%] flex items-center justify-between border-b-[0.1vw] border-[#2C2C2C] p-2">
                <span className="text-left text-[0.9vw]">Theme</span>
                <SelectComponent
                    selectedValue={selectedTheme}
                    options={options_theme}
                    onChange={setSelectedTheme}
                />
            </div>


            {/* Font Size */}
            <div className="w-full h-[8%] flex items-center justify-between border-b-[0.1vw] border-[#2C2C2C] p-2">
                <span className="text-left text-[0.9vw]">Font Size</span>
                <SelectComponent
                    selectedValue={selectedFont}
                    options={options_font}
                    onChange={setSelectedFont}
                    
                />
            </div>








            {/* Enable Basic Autocomplete */}
            <div className="w-full flex-1 flex flex-row gap-[1%]    p-2">

                <div className="flex-1 flex flex-col gap-[10%]">

                    <div className="flex flex-row  gap-2 text-[1.1vw]">
                        <input type="checkbox" />
                        <h1>Show Gutter</h1>
                    </div>



                    <div className="flex flex-row  gap-2 text-[1.1vw]">
                        <input type="checkbox" />
                        <h1>Show Line Numbers</h1>
                    </div>



                
                </div>

                <div className="flex-1 flex flex-col gap-[10%]">
                   
                    <div className="flex-1 flex justify-start items-center h-[10%]">
                        <button className="w-[10vw] h-[2.5vw] bg-[#08618E] rounded-lg text-[1vw] hover:bg-[#31B8D6]">Reset Terminal</button>
                    </div>


                </div>



            </div>




        </div>
    );
}
