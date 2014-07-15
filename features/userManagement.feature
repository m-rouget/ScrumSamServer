Feature: Top level user management
  AS a XXX
  I WANT to YYYY
  SO THAT ZZZZ

   Scenario: I can clear a non-empty list
      Given an user list with at least 1 user
      When I clear the user list
      Then the list contains 0 elements
  
   Scenario: I can create a user in an empty list
      Given an empty user list
      When I create user "scrum.sam@mail.com"
      Then the user list contains "scrum.sam@mail.com"

   Scenario: I can create a new user 
      Given an user list without user "scrum.sam@mail.com"
      When I create user "scrum.sam@mail.com"
      Then the user list contains "scrum.sam@mail.com"

   Scenario: I cannot create twice the same user
      Given an empty user list
      When I create user "scrum.sam@mail.com"
      And I try to create user "scrum.sam@mail.com"
      Then I receive a "CONFLICT" error message

   Scenario: I can delete an individual a user from the user list
      Given an user list with user "scrum.sam@mail.com"
      When I delete user "scrum.sam@mail.com"
      Then the user list does not contains "scrum.sam@mail.com"


