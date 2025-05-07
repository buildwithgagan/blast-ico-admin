
import React, { createContext, useContext, useState } from "react";
import { cmcData } from "@/data/cmcData";
import { TokenAllocation, RoadmapItem, FaqItem, Tokenomics, Roadmap } from "@/types/cmc";

interface CmcContextType {
  tokenomics: Tokenomics;
  roadmap: Roadmap;
  faq: {
    items: FaqItem[];
  };
  loading: boolean;
  updateTokenAllocation: (updatedAllocations: TokenAllocation[]) => void;
  updateRoadmapItems: (updatedItems: RoadmapItem[]) => void;
  updateFaqItems: (updatedItems: FaqItem[]) => void;
  addFaqItem: (item: FaqItem) => void;
  deleteFaqItem: (id: string) => void;
  updateFaqItem: (id: string, updatedItem: Partial<FaqItem>) => void;
  updateTokenomics: (updatedTokenomics: Tokenomics) => void;
  updateRoadmap: (updatedRoadmap: Roadmap) => void;
}

const CmcContext = createContext<CmcContextType | undefined>(undefined);

export const CmcProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tokenomics, setTokenomics] = useState(cmcData.tokenomics);
  const [roadmap, setRoadmap] = useState(cmcData.roadmap);
  const [faq, setFaq] = useState(cmcData.faq || { items: [] });
  const [loading, setLoading] = useState(false);

  const updateTokenAllocation = (updatedAllocations: TokenAllocation[]) => {
    setTokenomics({
      ...tokenomics,
      tokenAllocations: updatedAllocations
    });
  };

  const updateTokenomics = (updatedTokenomics: Tokenomics) => {
    setTokenomics(updatedTokenomics);
  };

  const updateRoadmap = (updatedRoadmap: Roadmap) => {
    setRoadmap(updatedRoadmap);
  };

  const updateRoadmapItems = (updatedItems: RoadmapItem[]) => {
    setRoadmap({
      ...roadmap,
      items: updatedItems
    });
  };

  const updateFaqItems = (updatedItems: FaqItem[]) => {
    setFaq({
      ...faq,
      items: updatedItems
    });
  };

  const addFaqItem = (item: FaqItem) => {
    setFaq({
      ...faq,
      items: [...faq.items, item]
    });
  };

  const deleteFaqItem = (id: string) => {
    setFaq({
      ...faq,
      items: faq.items.filter(item => item.id !== id)
    });
  };

  const updateFaqItem = (id: string, updatedItem: Partial<FaqItem>) => {
    setFaq({
      ...faq,
      items: faq.items.map(item => 
        item.id === id ? { ...item, ...updatedItem } : item
      )
    });
  };

  return (
    <CmcContext.Provider
      value={{
        tokenomics,
        roadmap,
        faq,
        loading,
        updateTokenAllocation,
        updateRoadmapItems,
        updateFaqItems,
        addFaqItem,
        deleteFaqItem,
        updateFaqItem,
        updateTokenomics,
        updateRoadmap
      }}
    >
      {children}
    </CmcContext.Provider>
  );
};

export const useCmc = () => {
  const context = useContext(CmcContext);
  if (context === undefined) {
    throw new Error("useCmc must be used within a CmcProvider");
  }
  return context;
};
