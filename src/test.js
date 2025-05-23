const content_lines = `
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

const linesArray = content_lines.split("\n").map((line) => line.trim());

function getHeadingLevel(heading) {
  const headingLevelstr = heading.split(" ")[0];
  currHeadingLevel = headingLevelstr.length;
  return currHeadingLevel;
}

function getHeadingChildren(lines, heading, todos) {
  if (heading.startsWith("#")) {
    headingLevel = getHeadingLevel(heading);
    console.log(headingLevel);
    headingFound = false;
    todos = [];
    for (let index = 0; index < lines.length; index++) {
      line = lines[index];

      if (headingFound) {
        if (line.startsWith("#")) {
          const words = line.split(" ");
          if (words.length > 1) {
            console.log(line);
            currentHeadingLevel = getHeadingLevel(line);
            if (currentHeadingLevel <= headingLevel) {
              headingFound = false;
              break;
            } else {
              todos.push(line);
            }
          }
        } else {
          todos.push(line);
        }
      }

      if (heading === line) {
        console.log("heading found");
        headingFound = true;
        continue;
      }
    }
  }
  console.log(todos);
}

heading = "### To-dos";
todos = [];
no = getHeadingChildren(linesArray, heading, todos);
console.log(todos);
