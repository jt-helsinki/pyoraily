/*
 *
 * MIT License.
 *
 */
import * as UserUtils from 'pyoraily-shared-frontend/utils/UserUtils';
import { UserRole } from 'pyoraily-shared-frontend/model/UserRole';
import { useUserRolesFromUseUserSessionStateStore } from '@src/react/hooks/state/client/useUserSessionStateStore';
import { ROOT_ROUTE_PATHS } from '@src/react/routes/RootRoutePaths';
import * as RouteConstants from '@src/react/routes/RouteConstants';
import { RoutePath } from '@src/react/routes/RoutePath';
import * as RouteUtils from '@src/react/routes/RouteUtils';
import * as React from 'react';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link, Location, NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Sidebar } from 'semantic-ui-react';

const headerMenuItemMapFunction = (
  routePaths: RoutePath[],
  navigate: NavigateFunction,
  location: Location,
  userRoles: UserRole[]
): React.ReactElement[] =>
  routePaths
    .map((routePath: RoutePath, index: number) => {
      const to: string = RouteUtils.removeWildcardFromPath(routePath.path);
      const canAccess: boolean = UserUtils.doUserRolesIntersectRequiredUserRoles(userRoles, routePath.roles);
      return routePath.showInMenu && canAccess ? (
        <Menu.Item key={index} as={Link} to={to} active={location.pathname === to}>
          {/* {routePath.icon ? <Icon name={routePath.icon}/> : null} */}
          <span>{routePath.menuLinkString}</span>
        </Menu.Item>
      ) : null;
    })
    .filter((path) => path) as React.ReactElement[];

const HamIcon = () => <i className="bars icon inverted" />;

const CloseIcon = () => <i className="close red icon" />;

const Overlay = () => (
  <div
    style={{
      backgroundColor: 'rgba(0, 0, 0, 0.795)',
      position: 'fixed',
      height: '110vh',
      width: '100%',
      marginTop: '-20px',
      zIndex: 100,
    }}
  />
);

interface ResponsiveNavbarProps {
  primaryMenu: React.ReactElement[];

  secondaryMenu: React.ReactElement[];
}

const ResponsiveNavbar = (props: React.PropsWithChildren<ResponsiveNavbarProps>) => {
  const [visible, setVisible] = useState(false);
  const [icon, setIcon] = useState(HamIcon);

  function hideSidebar(): void {
    setIcon(HamIcon);
    setVisible(false);
  }

  function showSidebar(): void {
    setIcon(CloseIcon);
    setVisible(true);
  }

  function toggleSidebar(): void {
    if (visible) {
      hideSidebar();
    } else {
      showSidebar();
    }
  }

  return (
    <>
      {visible && <Overlay />}
      <Menu inverted={true} color="blue" size="tiny">
        <Menu.Menu position="right">
          <Menu.Item onClick={toggleSidebar}>{icon}</Menu.Item>
        </Menu.Menu>
      </Menu>
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        vertical
        visible={visible}
        width="thin"
        onHide={hideSidebar}>
        {props.primaryMenu}
        {props.secondaryMenu}
        <Menu.Item key="logout-menu-item" as={Link} to={ROOT_ROUTE_PATHS.logout} color="blue">
          Logout
        </Menu.Item>
      </Sidebar>
    </>
  );
};

interface NavbarProps {
  primaryMenu: React.ReactElement[];

  secondaryMenu: React.ReactElement[];
}

const Navbar = (props: NavbarProps) => (
  <Menu size="tiny" inverted={true} color="blue">
    {props.primaryMenu}
    <Menu.Menu position="right">
      {props.secondaryMenu}
      <Menu.Item key="logout-menu-item" as={Link} to={ROOT_ROUTE_PATHS.logout} color="blue">
        Logout
      </Menu.Item>
    </Menu.Menu>
  </Menu>
);

export const MainHeaderNavigation = (props: React.PropsWithChildren): React.ReactElement => {
  const location = useLocation();
  const navigate = useNavigate();
  const userRoles: UserRole[] = useUserRolesFromUseUserSessionStateStore();

  const none = useMediaQuery({ query: '(max-width:576px)' });
  const sm = useMediaQuery({ query: '(min-width:576px)' });
  const md = useMediaQuery({ query: '(min-width:768px)' });
  const lg = useMediaQuery({ query: '(min-width:992px)' });
  const xl = useMediaQuery({ query: '(min-width:1200px)' });
  const xxl = useMediaQuery({ query: '(min-width:1400px)' });
  const size = { none, sm, md, lg, xl, xxl };

  const SECONDARY_ACTION_MENU_ITEMS = headerMenuItemMapFunction(
    RouteConstants.ACTION_ROUTE_PATHS,
    navigate,
    location,
    userRoles
  );
  const PRIMARY_MENU_ITEMS = headerMenuItemMapFunction(
    RouteConstants.PRIMARY_ROUTE_PATHS,
    navigate,
    location,
    userRoles
  );
  return (
    <>
      {size.md ? (
        <>
          <Navbar primaryMenu={PRIMARY_MENU_ITEMS} secondaryMenu={SECONDARY_ACTION_MENU_ITEMS} />
          {props.children}
        </>
      ) : (
        <>
          <ResponsiveNavbar primaryMenu={PRIMARY_MENU_ITEMS} secondaryMenu={SECONDARY_ACTION_MENU_ITEMS} />
          {props.children}
        </>
      )}
    </>
  );
};
