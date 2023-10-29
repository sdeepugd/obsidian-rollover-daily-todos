import { expect, test } from "vitest";
import { getTodos } from "./get-todos";

test("single todo element should return itself", () => {
  // GIVEN
  const lines = ["- [ ] tada"];

  // WHEN
  const result = getTodos({ lines });

  // THEN
  const todos = ["- [ ] tada"];
  expect(result).toStrictEqual(todos);
});

test("get todos with children", function () {
  // GIVEN
  const lines = [
    "- [ ] TODO",
    "    - [ ] Next",
    "    - some stuff",
    "- [ ] Another one",
    "    - [ ] More children",
    "    - another child",
    "- this isn't copied",
  ];

  // WHEN
  const todos = getTodos({ lines: lines, withChildren: true });

  // THEN
  const result = [
    "- [ ] TODO",
    "    - [ ] Next",
    "    - some stuff",
    "- [ ] Another one",
    "    - [ ] More children",
    "    - another child",
  ];
  expect(todos).toStrictEqual(result);
});

test("get todos without children", () => {
  // GIVEN
  const lines = [
    "- [ ] TODO",
    "    - [ ] Next",
    "    - some stuff",
    "- [ ] Another one",
    "    - [ ] More children",
    "    - another child",
    "- this isn't copied",
  ];

  // WHEN
  const todos = getTodos({ lines });

  // THEN
  const result = [
    "- [ ] TODO",
    "    - [ ] Next",
    "- [ ] Another one",
    "    - [ ] More children",
  ];
  expect(todos).toStrictEqual(result);
});

test("get todos with children doesn't fail if child at end of list", () => {
  // GIVEN
  const lines = [
    "- [ ] TODO",
    "    - [ ] Next",
    "    - some stuff",
    "- [ ] Another one",
    "    - [ ] More children",
    "    - another child",
  ];

  // WHEN
  const todos = getTodos({ lines, withChildren: true });

  // THEN
  const result = [
    "- [ ] TODO",
    "    - [ ] Next",
    "    - some stuff",
    "- [ ] Another one",
    "    - [ ] More children",
    "    - another child",
  ];
  expect(todos).toStrictEqual(result);
});

test("get todos with nested children also adds nested children", () => {
  // GIVEN
  const lines = [
    "- [ ] TODO",
    "    - [ ] Next",
    "    - some stuff",
    "        - some stuff",
    "        - some stuff",
    "- [ ] Another one",
    "    - [ ] More children",
    "    - another child",
  ];

  // WHEN
  const todos = getTodos({ lines, withChildren: true });

  // THEN
  const result = [
    "- [ ] TODO",
    "    - [ ] Next",
    "    - some stuff",
    "        - some stuff",
    "        - some stuff",
    "- [ ] Another one",
    "    - [ ] More children",
    "    - another child",
  ];
  expect(todos).toStrictEqual(result);
});

test("get todos doesn't add intermediate other elements", () => {
  // GIVEN
  const lines = [
    "# Some title",
    "",
    "- [ ] TODO",
    "    - [ ] Next",
    "    - some stuff",
    "",
    "## Some title",
    "",
    "Some text",
    "...that continues here",
    "",
    "- Here is a bullet item",
    "- Here is another bullet item",
    "1. Here is a numbered list item",
    "- [ ] Another one",
    "    - [ ] More children",
    "    - another child",
  ];

  // WHEN
  const todos = getTodos({ lines, withChildren: true });

  // THEN
  const result = [
    "- [ ] TODO",
    "    - [ ] Next",
    "    - some stuff",
    "- [ ] Another one",
    "    - [ ] More children",
    "    - another child",
  ];
  expect(todos).toStrictEqual(result);
});

test("To do ", () => {
  // GIVEN
  const content = `
  ### To-dos
  
  > [!Info] Self Confidence
  > With Confidence you have won before you started !!!
  
  > [!Info] Brave
  > Courage is Grace under pressure !!!
  
  > [!Info] Trust
  > Trust is built with consistency !!!
  
  > [!Info] Think Big
  > Don't Sweat on small stuff !!!
  
  ## Don't 
  _________
  - Waste time in plugins 
  - Waste time in online shopping
  
  ## Do
  _____
  - Have separate time for plugins explorations and shopping
  -  Focus on your work 
  - Prioritize on your work
  
  #### Start your day 
  _____
  
  ### Questions & Answers
  _________ 
  #To-do
  ### To-dos
  
  ##### Onboarding
  - [ ] [[HC Pool Warm up]]   #Sev2
  - [ ] [[On Call Training]] 
  - [ ] https://w.amazon.com/bin/view/AppSec_AWS_Auth_Tutorial/ Auth tutorial
  - [ ] Review [[Security at AWS]] 
  - [ ] Embark  #Sev4
    - [ ] Cloudmap Videos
      - [ ] Service endpoint and VPC endpoint from Customer POV 
      - [ ] Design patterns 
      - [ ] Http Data plane arch 
      - [ ] Health Arch 
    - [ ] Familiarize with the workflow 
      - [ ] Check on CRs
        - [ ] design patterns 
        - [ ] code style 
        - [ ] common comments 
      - [ ] Review on call 
        - [ ] Customer incidents 
      - [ ] Review Deployments 
        - [ ] Ops Review
  ##### AWS
  - [ ] [[Kinesis]] 
  - [ ] EKS
  - [ ] [[Cloud Map]] 
  ##### On Call 
  - [ ] [[On Call Training]] 
  
  ##### Engineering Excellence 
  - [ ] Go through the docs [w.amazon.com](https://w.amazon.com/bin/view/EE/Learn/)
  ##### General Stuff
  - [ ] Language rampup 
    - [ ] Jinja 
    - [ ] Kotlin
  - [ ] Know about LPT 
  - [ ] What are ITAR Events?
  
  #### Hobbies
  - [ ] Obsidian Templates [GitHub - SilentVoid13/Templater: A template plugin for obsidian](https://github.com/SilentVoid13/Templater) 
  #### House errands
  - [ ] Going to India 
    - [ ] Buy electronics for family 
    - [ ] Buy gifts from family
  - [ ] Health Card MSP 
    - [ ] Follow up
  - [ ] Driving License 
    - [ ] Apply for DL
  - [ ] PR 
    - [ ] [[IELTS]] 
  - [ ] Wife and Daughter Visa and WP Process
    - [ ] Follow up
  - [ ] Tax in Canada 
    - [ ] Find way to reduce tax
  - [ ] Immigration
  -  hit the gym
  
  ### Work Done Today 
  _____ 
  
  ### Learnings 
  _____ 
  
  #StandupDiscussion
  
  #### Contributions 
  _________ 
  
  #### Went Well 
  _________ 
  
  #### Didn't Went Well 
  _________ 
  
  #### Leisure To-dos 
  _________ 
  
  #### End your day 
  -  change your status 
  -  check tomorrow meetings 
  review the day
  `;

  // WHEN
  const todos = getTodos({ lines, withChildren: true });
});
