Project Title: Kindle (as in "kindling" a new life, and a play on "Tinder")

1. Core Concept

A mobile-first, single-page web application that allows two parents to collaboratively find baby names they both like. The app features a "Tinder-style" swipe-right (like) / swipe-left (dislike) interface. A key feature is the ability for friends and family to submit name suggestions.

This updated version adds a second phase: once parents have their "matched" list, they can rank it and share it publicly for friends and family to vote on their favorites.

2. User Roles

Parents (The "Swipers" / "Rankers"): They create a private "Name Room," swipe on names, and are the only ones who can see and rank the final matched list.

Suggestors (Friends & Family - Phase 1): Anyone with a "Suggestion Link" can submit name ideas before the swiping is done.

Voters (Friends & Family - Phase 2): Anyone with a "Voting Link" can view the parents' final ranked list and vote for their favorite names.

3. Core Functionality

The entire application will live in a single .html file. It will use Firebase (Firestore) as its real-time backend.

View 1: Home / Room Creation

A "Create New Room" button.

Generates a unique Room ID and creates the room document in Firestore.

The user (Parent 1) is taken to the Swiping View.

The app displays the Room ID and three shareable links:

"Parent 2 Join Link": (e.g., app.html?room=XYZ123)

"Suggestion Link (Phase 1)": (e.g., app.html?suggest=XYZ123)

"Voting Link (Phase 2)": (e.g., app.html?vote=XYZ123) - This link can be shared later.

View 2: Joining a Room (for Parent 2)

Loads the Swiping View for the specified room.

View 3: Suggestion Form (for Suggestors)

A simple form to submit name suggestions, which are added to the room's suggestions list in Firestore.

View 4: The Swiping Interface (for Parents)

Displays name cards one at a time, sourced from a default list and the suggestions list.

Swiping Right (Like) and Left (Dislike) records the choice in Firestore under each parent's user ID.

Match Detection: The app monitors for names that have been "liked" by both parents.

View 5: Ranked Matches List (for Parents)

A new view, accessible only to parents, that displays the list of all "Matched" names.

Drag-and-Drop Ranking: Parents can drag and drop the matched names to create a preferred ranked order (e.g., #1, #2, #3).

This order is saved to a ranked_list field in the Firestore document.

View Votes: This page will also display the current vote count for each name (e.g., "Chloe: 12 votes").

This view prominently features the "Share for Voting" link (app.html?vote=XYZ123).

View 6: Public Voting Page (for Voters)

Accessed via the "Voting Link" (app.html?vote=XYZ123).

Displays the parents' final, ranked list of names (e.g., "#1: Chloe", "#2: Samuel").

Next to each name is an "Upvote" button (e.g., a heart icon).

Clicking "Upvote" increments a votes counter for that name in Firestore.

Simple vote spam prevention: The app will use the browser's localStorage to remember if a user has voted, preventing them from voting multiple times from the same device.

4. Technical Implementation (Single .html File)

HTML: A single index.html file with different <div> sections for each view (Home, Swiping, Ranked Matches, Suggest, Vote).

Styling (Tailwind CSS): Loaded via the Tailwind CDN script in the <head>.

Logic (JavaScript & Firebase):

All code in a single <script type="module"> tag.

Firebase CDN imports (App, Auth, Firestore).

Authentication: Firebase Anonymous Authentication to provide a userId for each parent.

Drag-and-Drop: We will use the native HTML Drag and Drop API to implement the ranking feature, avoiding the need for an external library.

Database (Firestore) Structure:

rooms/ (collection)

XYZ123/ (document for one room)

parent1_id: (The userId of Parent 1)

parent2_id: (The userId of Parent 2)

suggestions: ["Aiden", "Brielle", ...]

swipes: { "Anna": { [parent1_id]: "like", [parent2_id]: "like" }, ... }

ranked_list: ["Anna", "Samuel", "Chloe"] (This new array stores the parent-ranked order)

votes: { "Anna": 12, "Samuel": 8, "Chloe": 5 } (This new object stores the public vote counts)

5. Limitations to Accept

Online Only: Requires an internet connection.

Firebase Setup: You will still need to create a free Firebase project and paste the firebaseConfig object into the code.

Vote Security: The localStorage voting prevention is not foolproof and can be bypassed, but it's effective for casual use.