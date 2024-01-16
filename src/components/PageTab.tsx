import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PageTab = () => {
  return (
    <Tabs defaultValue="account" className="lg:w-11/12 w-full mx-auto ">
      <TabsList className="w-full p-8 border">
        <TabsTrigger
          value="account"
          className="w-full text-lg font-semibold py-3">
          Gift Cards
        </TabsTrigger>
        <TabsTrigger
          value="password"
          className="w-full text-lg font-semibold py-3">
          Crypto
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  );
};

export default PageTab;
