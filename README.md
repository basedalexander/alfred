# Alfred: A personal assistant for Lens Protocol

![Alfred Logo](alfered.png)

Alfred is a personal assistant for Lens Protocol. It accepts queries in natural language and executes them on Lens Protocol data to help us
understand content, people and complex network structures in more human comprehensible form.

It helps you to discover relevant content, find useful accounts to follow, understand your followers better!

Key features: 
    - Communicate in a natural language via telegram bot. 
    - Get insights from from data sources on Lens Protocol, Airstack and BigQuery 
    - Help make good decisions by having all relevant information at tip of finger

Examples Queries: 
    - Show me the most influential people that talk about DAOs. 
    - Tell me about stanis.lens 
    - Tell me about Token holdings of stanis.eth 
    - Tell me about most influencial people in fashion industry 
    - Is there anyone in my followers posting about fashion? Show a TLDR for each person 
    - Is there anyone I am following that is posting about fashion? Show a TLDR for each person

# How it's Made
A lot had to come together to make our vision a reality (in just under one day!): 
    - Researching the initial use cases by interviewing our ideal users and then exploring what was feasible to build within 24hrs 
    - Filtering and downloading the LENS data. 
    - Generating embeddings for each of the posts and storing them in a vector db (Chroma). Not having access to a GPU, fully embedding all LENS posts would take many days on a macbook. 
    - Iterating many times over the backend execution architecture, command format and the prompts to the LLM 
    - Using and understanding external APIs including the GraphQL endpoints for LENS and Airstack

