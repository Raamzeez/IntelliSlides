// code for parsing input
const parseList = (response: string): string[] => {
    const items: string[] = [];
    const rawItemsArray = response.split("\n");
    
    rawItemsArray.forEach((title) => {
        if (title.length > 0) {
            console.log("title: "+ title);
            let splitTitle = title.split(". ");
            if (splitTitle.length === 1) {
                splitTitle = title.split(") ");
            }
            console.log("splitTitle: "+ splitTitle);
            if (splitTitle.length > 1) {
                items.push(splitTitle.slice(1).join(". "));
            }
        }
    });

    console.log(items);

    return items;
};

export default parseList;

