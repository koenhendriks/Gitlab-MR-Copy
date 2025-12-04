# Changelog

## 1.8

- Fix for [Gitlab interface redesign](https://docs.gitlab.com/user/interface_redesign/).

## 1.7

- Fix bug were the bypass button was not hidden on the merge request page in latest Gitlab.

## 1.6
- Fix bug where the copy button was not injected on the merge request page.
- Fix bug that caused to copy an old title when the title was changed after the copy button was injected (such as `'Draft:'` being removed).
- Fix visual bug where the copy button was not aligned properly with the title on the merge request page.

## 1.5

- Add option to change the style of the set-auto merge button. See PR  [#1](https://github.com/koenhendriks/Gitlab-MR-Copy/pull/1)

## 1.4

- Changed Logo and updated name to prevent unauthorized use of GitLab intellectual property.

## 1.3
- Added feature that hides the 'bypass' button from merge request with suggested changes. 
  - See [Bypass a request for changes](https://docs.gitlab.com/ee/user/project/merge_requests/reviews/index.html#bypass-a-request-for-changes) for more info.
- Fixed bug where the copy button could not be injected on the tags page.
- Added popup to the extension showing 3 basic settings:
  - `Hide Bypass button` - Hides the bypass button from the merge request page.
  - `Show title copy button` - Add copy button to the title of the merge request. 
  - `Show tag copy button` - Add copy button to the tags on the tags page.
  
## 1.2
- Fixed bug where the copy button became invisible on both the MR and tags page.

## 1.1
- Introduced new feature which also adds copy button for every tag on the tags page.

## 1.0

- Initial Release
