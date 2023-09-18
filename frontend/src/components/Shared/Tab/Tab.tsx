import React, { useState } from 'react';
import './Tab.css'

type TabItem = {
    id: string;
    tabTitle: string;
    content: any;
}

type TabType = {
    tabs: TabItem[]
}

const Tabs = ({tabs}: TabType) => {

    const [currentTab, setCurrentTab] = useState('1');

    const handleTabClick = (e: any) => {
        setCurrentTab(e.target.id);
    }

    return (
        <div className='tabContainer'>
            <div className='tabHeader'>
                {tabs.map((tab: TabItem, i: number) =>
                    <button className={`tabTitle ${(tab.id === currentTab) ? "active" : ""}`} key={i} id={tab.id} disabled={currentTab === `${tab.id}`} onClick={(handleTabClick)}>{tab.tabTitle}</button>
                )}
            </div>
            <div className='tabContent'>
                {tabs.map((tab: TabItem, i: number) =>
                    <div key={i}>
                        {currentTab === `${tab.id}` && tab.content }
                    </div>
                )}
            </div>
        </div>
    );
}

export default Tabs;