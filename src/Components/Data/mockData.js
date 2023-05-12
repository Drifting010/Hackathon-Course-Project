// Mock Data to demosntrate the Data Grid display function
export const mockDataHacakthonList = [
    {
      id: 1,
      name: "Hatsune",
      host: "Sega",
      domain: "Uta",
      startTime: "2023/7/1",
      endTime: "2023/7/2",
      status: "Planning",
    },
    {
      id: 2,
      name: "Kane",
      host: "Kanelmis",
      domain: "Uta",
      startTime: "2023/7/1",
      endTime: "2023/7/2",
      status: "Planning",
    },
    {
      id: 3,
      name: "Sakura",
      host: "Aniplex",
      domain: "Anime",
      startTime: "2023/8/10",
      endTime: "2023/8/12",
      status: "Confirmed",
    },
    {
      id: 4,
      name: "GameCon",
      host: "Sony",
      domain: "Gaming",
      startTime: "2023/9/15",
      endTime: "2023/9/17",
      status: "Planning",
    },
    {
      id: 5,
      name: "Fashion Week",
      host: "Vogue",
      domain: "Fashion",
      startTime: "2023/10/5",
      endTime: "2023/10/8",
      status: "Confirmed",
    },
    {
      id: 6,
      name: "Tech Summit",
      host: "Google",
      domain: "Technology",
      startTime: "2024/1/20",
      endTime: "2024/1/22",
      status: "Planning",
    },
    {
      id: 7,
      name: "EcoForum",
      host: "Greenpeace",
      domain: "Environment",
      startTime: "2024/3/10",
      endTime: "2024/3/12",
      status: "Confirmed",
    },
    {
      id: 8,
      name: "ArtExpo",
      host: "Museum of Modern Art",
      domain: "Art",
      startTime: "2024/5/5",
      endTime: "2024/5/8",
      status: "Planning",
    },
    {
      id: 9,
      name: "SportsFest",
      host: "ESPN",
      domain: "Sports",
      startTime: "2024/7/15",
      endTime: "2024/7/17",
      status: "Confirmed",
    },
    {
      id: 10,
      name: "FoodFest",
      host: "Food Network",
      domain: "Culinary",
      startTime: "2024/9/10",
      endTime: "2024/9/12",
      status: "Planning",
    },
  ];
  
  /* Mocked Bar Chart Data for demonstration purpose
  Fields for BarChart"Web3", "BlockChain", "ChatGPT", "AI", "ML", "Anime" */
  export const mockBarData = [
    {
      Date: "Day1",
      Web3: 2,
      BlockChain: 4,
      AI: 30,
      ML: 50,
      Anime: 32,
    },
    {
      Date: "Day2",
      Web3: 10,
      BlockChain: 4,
      AI: 14,
      ML: 25,
      Anime: 12,
    },
    {
      Date: "Day3",
      Web3: 35,
      BlockChain: 44,
      AI: 14,
      ML: 25,
      Anime: 12,
    },
    {
      Date: "Day4",
      Web3: 50,
      BlockChain: 67,
      AI: 34,
      ML: 25,
      Anime: 22,
    },
    {
      Date: "Day5",
      Web3: 67,
      BlockChain: 23,
      AI: 52,
      ML: 32,
      Anime: 10,
    },
    {
      Date: "Day6",
      Web3: 10,
      BlockChain: 4,
      AI: 17,
      ML: 4,
      Anime: 11,
    },
    {
      Date: "Day7",
      Web3: 5,
      BlockChain: 6,
      AI: 15,
      ML: 23,
      Anime: 16,
    },
  ];
  
  /* Mocked line chart Data for demonstration purpose
  Fields for BarChart"Web3", "BlockChain", "ChatGPT", "AI", "ML", "Anime" */
  export const mockDataLineChart = [
    {
      id: "Web3",
      color: "hsl(78, 70%, 50%)",
      data: [
        {
          x: "Day1",
          y: 107,
        },
        {
          x: "Day2",
          y: 117,
        },
        {
          x: "Day3",
          y: 127,
        },
        {
          x: "Day4",
          y: 137,
        },
        {
          x: "Day5",
          y: 127,
        },
        {
          x: "Day6",
          y: 17,
        },
        {
          x: "Day7",
          y: 17,
        },
      ],
    },
    {
      id: "BlockChain",
      color: "hsl(330, 70%, 50%)",
      data: [
        {
          x: "Day1",
          y: 27,
        },
        {
          x: "Day2",
          y: 17,
        },
        {
          x: "Day3",
          y: 7,
        },
        {
          x: "Day4",
          y: 37,
        },
        {
          x: "Day5",
          y: 45,
        },
        {
          x: "Day6",
          y: 47,
        },
        {
          x: "Day7",
          y: 45,
        },
      ],
    },
    {
      id: "ChatGpt",
      color: "hsl(196, 70%, 50%)",
      data: [
        {
          x: "Day1",
          y: 27,
        },
        {
          x: "Day2",
          y: 17,
        },
        {
          x: "Day3",
          y: 7,
        },
        {
          x: "Day4",
          y: 37,
        },
        {
          x: "Day5",
          y: 45,
        },
        {
          x: "Day6",
          y: 47,
        },
        {
          x: "Day7",
          y: 45,
        },
      ],
    },
    {
      id: "AI",
      color: "hsl(347, 70%, 50%)",
      data: [
        {
          x: "Day1",
          y: 16,
        },
        {
          x: "Day2",
          y: 19,
        },
        {
          x: "Day3",
          y: 20,
        },
        {
          x: "Day4",
          y: 18,
        },
        {
          x: "Day5",
          y: 23,
        },
        {
          x: "Day6",
          y: 24,
        },
        {
          x: "Day7",
          y: 26,
        },
      ],
    },
    {
      id: "ML",
      color: "hsl(292, 70%, 50%)",
      data: [
        {
          x: "Day1",
          y: 15,
        },
        {
          x: "Day2",
          y: 18,
        },
        {
          x: "Day3",
          y: 21,
        },
        {
          x: "Day4",
          y: 19,
        },
        {
          x: "Day5",
          y: 22,
        },
        {
          x: "Day6",
          y: 25,
        },
        {
          x: "Day7",
          y: 24,
        },
      ],
    },
  ];
  
  //mock data for user and host contrast
  export const mockPieData1 = [
    {
      id: "host",
      label: "host",
      value: 29,
      color: "hsl(104, 70%, 50%)",
    },
    {
      id: "user",
      label: "user",
      value: 239,
      color: "hsl(104, 70%, 50%)",
    },
  ];
  
  // mock data for types of hackathons in the platform
  export const mockPieData2 = [
    {
      id: "Web3",
      label: "Web3",
      value: 239,
      color: "hsl(104, 70%, 50%)",
    },
    {
      id: "BlockChain",
      label: "BlockChain",
      value: 30,
      color: "hsl(104, 70%, 50%)",
    },
    {
      id: "AI",
      label: "AI",
      value: 60,
      color: "hsl(104, 70%, 50%)",
    },
  
    { id: "ML", label: "ML", value: 60, color: "hsl(104, 70%, 50%)" },
  
    { id: "Anime", label: "Anime", value: 60, color: "hsl(104, 70%, 50%)" },
  ];
  