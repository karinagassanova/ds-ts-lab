import {Friend, Colleague, EmailContact } from './myTypes'
import { friends, colleagues } from './01-basics'

function older(f: Friend) {
    f.age += 1
    return `${f.name} is now ${f.age}` // TS infers string[]
  }
  
console.log(older(friends[0]))

// Increment all friends
function allOlder(friendsArray: Friend[]) {
    return friendsArray.map(f => {
      f.age += 1
      return `${f.name} is now ${f.age}` // TS infers string[]
    })
  }  

  console.log(allOlder(friends))

  // Find the colleague with the highest extension number.
  function highestExtension(cs: Colleague[]) { // TypeScript infers return type automatically
    const result = cs.sort(
      (c1, c2) => c1.contact.extension - c2.contact.extension
    );
    return result[cs.length - 1]; // TS infers this is Colleague
  }  
  console.log(highestExtension(colleagues.current));

  function addColleague(
    cs: Colleague[],
    name: string,
    department: string,
    email: string
  ) {
    const maxExt = highestExtension(cs).contact.extension
    const newColleague = { // TS infers Colleague type
      name,
      department,
      contact: {
        email,
        extension: maxExt + 1
      }
    }
    cs.push(newColleague)
  }  

  addColleague(colleagues.current, "Sheild O Connell", "HR", "soc@here.com");

console.log(
  colleagues.current.filter((c) => c.name === "Sheild O Connell")
);

function sortColleagues(
    colleagues: Colleague[],
    sorter: (c1: Colleague, c2: Colleague) => number
  ): EmailContact[] {
    const sorted = colleagues.sort(sorter); // Colleague[] inferred
    const result: EmailContact[] = sorted.map((ce) => ({ name: ce.name, email: ce.contact.email }));
    return result 
  }
  
  console.log(sortColleagues(colleagues.current, (a, b) => a.contact.extension - b.contact.extension));
  console.log(sortColleagues(colleagues.current, (a, b) => a.name.length - b.name.length));
  
  function findFriends(
    friendsArray: Friend[],
    criterion: (f: Friend) => boolean
  ): string[] {
    return friendsArray
      .filter(criterion)
      .map(f => f.name);
  }

  console.log(findFriends(friends, (friend) => friend.name.startsWith('Pa')));
  console.log(findFriends(friends, (friend) => friend.age < 35));
