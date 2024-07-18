import {ChatSectionContext, Conversation, Message, User} from "./ChatContext"


const users: User[] = [
    {
        id: 1,
        firstName: "Amine",
        lastName: "Alami",
        username: "yopi",
        profilePic: "./src/assets/profiles/1.jpg"
    },
    {
        id: 2,
        firstName: "Hamza",
        lastName: "Hamza",
        username: "piwai",
        profilePic: "./src/assets/profiles/2.png"
    },
    {
        id: 3,
        firstName: "Charlie",
        lastName: "Brown",
        username: "charlie_b",
        profilePic: "./src/assets/profiles/3.jpg",
      },
      {
        id: 4,
        firstName: "David",
        lastName: "Wilson",
        username: "dave_wilson",
        profilePic: "./src/assets/profiles/4.jpg",
      },
      {
        id: 5,
        firstName: "Eva",
        lastName: "Davis",
        username: "eva_d",
        profilePic: "./src/assets/profiles/5.jpg",
      },
      {
        id: 6,
        firstName: "Frank",
        lastName: "Miller",
        username: "frank_m",
        profilePic: "./src/assets/profiles/6.jpg",
      },
      {
        id: 7,
        firstName: "Grace",
        lastName: "Lee",
        username: "grace_lee",
        profilePic: "./src/assets/profiles/7.jpg",
      },
    
]

export  const convs: Conversation[] = [
    {
      channelId: 1,
      user1: users[0],
      user2: users[1],
      messages: [
        { id: 1, sender: users[1], content: "hey" },
        { id: 2, sender: users[0], content: "hello" },
        { id: 3, sender: users[1], content: "how are you" },
        {
          id: 4,
          sender: users[0],
          content:
            "Loreorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatibus vel eos non suscipit debitis quaerat laudantium facere eveniet porro? Consectetur consequatur porro repellendus nisi eum laudantium amet numquam accusamus!",
        },
        {
          id: 5,
          sender: users[1],
          content:
            "Loreorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatibus vel eos non suscipit debitis quaerat laudantium facere eveniet porro? Consectetur consequatur porro repellendus nisi eum laudantium amet numquam accusamus!",
        },
        {
          id: 6,
          sender: users[0],
          content:
          "Loreorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatibus vel eos non suscipit debitis quaerat laudantium facere eveniet porro? Consectetur consequatur porro repellendus nisi eum laudantium amet numquam accusamus!Loreorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatibus vel eos non suscipit debitis quaerat laudantium facere eveniet porro? Consectetur consequatur porro repellendus nisi eum laudantium amet numquam accusamus!Loreorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatibus vel eos non suscipit debitis quaerat laudantium facere eveniet porro? Consectetur consequatur porro repellendus nisi eum laudantium amet numquam accusamus!Loreorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatibus vel eos non suscipit debitis quaerat laudantium facere eveniet porro? Consectetur consequatur porro repellendus nisi eum laudantium amet numquam accusamus!Loreorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatibus vel eos non suscipit debitis quaerat laudantium facere eveniet porro? Consectetur consequatur porro repellendus nisi eum laudantium amet numquam accusamus!Loreorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatibus vel eos non suscipit debitis quaerat laudantium facere eveniet porro? Consectetur consequatur porro repellendus nisi eum laudantium amet numquam accusamus!Loreorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatibus vel eos non suscipit debitis quaerat laudantium facere eveniet porro? Consectetur consequatur porro repellendus nisi eum laudantium amet numquam accusamus!Loreorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatibus vel eos non suscipit debitis quaerat laudantium facere eveniet porro? Consectetur consequatur porro repellendus nisi eum laudantium amet numquam accusamus!Loreorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatibus vel eos non suscipit debitis quaerat laudantium facere eveniet porro? Consectetur consequatur porro repellendus nisi eum laudantium amet numquam accusamus!Loreorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatibus vel eos non suscipit debitis quaerat laudantium facere eveniet porro? Consectetur consequatur porro repellendus nisi eum laudantium amet numquam accusamus!Loreorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatibus vel eos non suscipit debitis quaerat laudantium facere eveniet porro? Consectetur consequatur porro repellendus nisi eum laudantium amet numquam accusamus!Loreorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatibus vel eos non suscipit debitis quaerat laudantium facere eveniet porro? Consectetur consequatur porro repellendus nisi eum laudantium amet numquam accusamus!Loreorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatibus vel eos non suscipit debitis quaerat laudantium facere eveniet porro? Consectetur consequatur porro repellendus nisi eum laudantium amet numquam accusamus!",
        },
        {
          id: 7,
          sender: users[1],
          content:
            "Loreorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatibus vel eos non suscipit debitis quaerat laudantium facere eveniet porro? Consectetur consequatur porro repellendus nisi eum laudantium amet numquam accusamus!",
        },
        {
          id: 8,
          sender: users[1],
          content:
            "Loreorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatibus vel eos non suscipit debitis quaerat laudantium facere eveniet porro? Consectetur consequatur porro repellendus nisi eum laudantium amet numquam accusamus!",
        },
        {
          id: 9,
          sender: users[1],
          content:
            "Loreorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatibus vel eos non suscipit debitis quaerat laudantium facere eveniet porro? Consectetur consequatur porro repellendus nisi eum laudantium amet numquam accusamus!",
        },
        {
          id: 10,
          sender: users[1],
          content:
            "Loreorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatibus vel eos non suscipit debitis quaerat laudantium facere eveniet porro? Consectetur consequatur porro repellendus nisi eum laudantium amet numquam accusamus!",
        },
      ],
    },
    {
      channelId: 2,
      user1: users[0],
      user2: users[2],
      messages: [
        { id: 1, sender: users[2], content: "hi there" },
        { id: 2, sender: users[0], content: "hello" },
        { id: 3, sender: users[2], content: "what's up?" },
        { id: 4, sender: users[0], content: "not much, you?" },
      ],
    },
    {
      channelId: 3,
      user1: users[0],
      user2: users[3],
      messages: [
        { id: 1, sender: users[3], content: "good morning" },
        { id: 2, sender: users[0], content: "morning!" },
        {
          id: 3,
          sender: users[3],
          content: "Loreorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatibus vel eos non suscipit debitis quaerat laudantium facere eveniet porro? Consectetur consequatur porro repellendus nisi eum laudantium amet numquam accusamus!",
        },
        {
          id: 4,
          sender: users[0],
          content:
            "Loreorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatibus vel eos non suscipit debitis quaerat laudantium facere eveniet porro? Consectetur consequatur porro repellendus nisi eum laudantium amet numquam accusamus!",
        },
      ],
    },
    {
      channelId: 4,
      user1: users[0],
      user2: users[4],
      messages: [
        { id: 1, sender: users[4], content: "hey, long time no see!" },
        { id: 2, sender: users[0], content: "yeah, it's been a while!" },
        {
          id: 3,
          sender: users[4],
          content:
            "Loreorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatibus vel eos non suscipit debitis quaerat laudantium facere eveniet porro? Consectetur consequatur porro repellendus nisi eum laudantium amet numquam accusamus!",
        },
        {
          id: 4,
          sender: users[0],
          content:
            "Loreorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatibus vel eos non suscipit debitis quaerat laudantium facere eveniet porro? Consectetur consequatur porro repellendus nisi eum laudantium amet numquam accusamus!",
        },
        {
          id: 5,
          sender: users[4],
          content:
            "Loreorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatibus vel eos non suscipit debitis quaerat laudantium facere eveniet porro? Consectetur consequatur porro repellendus nisi eum laudantium amet numquam accusamus!",
        },
      ],
    },
    {
      channelId: 5,
      user1: users[0],
      user2: users[5],
      messages: [
        { id: 1, sender: users[5], content: "hello!" },
        { id: 2, sender: users[0], content: "hi there!" },
        {
          id: 3,
          sender: users[5],
          content:
            "Loreorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatibus vel eos non suscipit debitis quaerat laudantium facere eveniet porro? Consectetur consequatur porro repellendus nisi eum laudantium amet numquam accusamus!",
        },
        {
          id: 4,
          sender: users[0],
          content:
            "Loreorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatibus vel eos non suscipit debitis quaerat laudantium facere eveniet porro? Consectetur consequatur porro repellendus nisi eum laudantium amet numquam accusamus!",
        },
      ],
    },
    {
      channelId: 6,
      user1: users[0],
      user2: users[6],
      messages: [
        { id: 1, sender: users[6], content: "hey, how's it going?" },
        { id: 2, sender: users[0], content: "good, you?" },
        {
          id: 3,
          sender: users[6],
          content:
            "Loreorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatibus vel eos non suscipit debitis quaerat laudantium facere eveniet porro? Consectetur consequatur porro repellendus nisi eum laudantium amet numquam accusamus!",
        },
      ],
    },
  ];
  