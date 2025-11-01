import CartButton from "@/components/CartButton";
import MenuCard from "@/components/MenuCard";
import { getCategories, getMenus } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { MenuItem } from "@/type";
import cn from "clsx";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//  <Button
//    title="Seed"
//    onPress={() =>
//      seed().catch((error) => {
//        console.log("failed to seed the database", error);
//      })
//    }
//  />;
const Search = () => {
  const { category, query } = useLocalSearchParams<{
    query: string;
    category: string;
  }>();

  const {
    data: menus,
    refetch,
    loading,
  } = useAppwrite({
    fn: getMenus,
    params: { category, query, limit: 6 },
  });

  const { data: categories } = useAppwrite({
    fn: getCategories,
  });

  useEffect(() => {
    refetch({ category, query, limit: 6 });
  }, [query, category]);

  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={menus}
        renderItem={({ item, index }) => {
          const isFirstRightColItem = index % 2 === 0;
          return (
            <View
              className={cn(
                "flex-1 max-w-[48%]",
                !isFirstRightColItem ? "mt-10" : "mt-0"
              )}
            >
              <MenuCard item={item as unknown as MenuItem} />
            </View>
          );
        }}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        columnWrapperClassName="gap-7"
        contentContainerClassName="gap-7 px-5 pb-32"
        ListHeaderComponent={() => (
          <View className="gap-5 my-5">
            <View className="flex-row w-full flex-between">
              <View className="flex-start">
                <Text className="uppercase small-bold text-primary">
                  Search
                </Text>
                <View className="flex-row flex-start gap-x-1 mt-0.5">
                  <Text className="paragraph-semibold">
                    Find Your Favourite Food
                  </Text>
                </View>
              </View>
              <CartButton />
            </View>
            <Text>Search Input</Text>
            <Text>Filter</Text>
          </View>
        )}
        ListEmptyComponent={() => !loading && <Text>No results</Text>}
      />
    </SafeAreaView>
  );
};

export default Search;
