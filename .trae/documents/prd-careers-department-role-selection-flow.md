## 1. Product Overview
Careers page par ek department-selection modal aur uske baad role-selection step dena.
User 3x3 card grid me select karke next-step CTA se aage badhe.

## 2. Core Features

### 2.1 Feature Module
Hamari requirements me ye essential pages hain:
1. **Careers Page**: department-selection modal (3x3 cards), role-selection step, next-step CTA.

### 2.2 Page Details
| Page Name | Module Name | Feature description |
|-----------|-------------|---------------------|
| Careers Page | Entry trigger | Open “Choose Department” modal (button/link) |
| Careers Page | Department modal (3x3 cards) | Show 9 department cards in grid; allow single selection; highlight selected card |
| Careers Page | Modal close & overlay | Close via top-right close icon, overlay click, ESC; restore focus to trigger |
| Careers Page | Step transition | On department select, enable “Next” CTA; proceed to role-selection step |
| Careers Page | Role selection | Show roles list/cards for chosen department; allow single role select |
| Careers Page | Next step CTA | After role select, show primary CTA (e.g., “View Role / Apply”) to continue to next step/page |

## 3. Core Process
User Flow:
1. User Careers page kholta hai aur “Choose Department” trigger se modal open karta hai.
2. User 3x3 grid me ek department card select karta hai; selection ke baad “Next” CTA enable hota hai.
3. User “Next” par click karke role-selection step par jata hai.
4. User ek role select karta hai; selection ke baad primary CTA dikhta/enable hota hai.
5. User CTA se next step (role detail ya apply flow) par proceed karta hai.

```mermaid
graph TD
  A["Careers Page"] --> B["Department Selection Modal"]