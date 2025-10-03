export interface NavButton {
  title: string
  href: string
  icon: string
}

export const NAV_BUTTONS: NavButton[] = [
  {
    title: 'Home',
    href: '/',
    icon: 'M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z',
  },
  {
    title: 'Products',
    href: '/products',
    icon: 'M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z',
  },
  {
    title: 'Add new product',
    href: '/editor',
    icon: 'M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z',
  },
]
