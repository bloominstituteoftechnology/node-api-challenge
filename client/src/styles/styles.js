import styled from "styled-components";

export const NavBarStyle = styled.nav`
  margin-bottom: 30px;
  .navbar {
    background-color: #9395e5;
  }

  .navbar-brand,
  a,
  .navbar-nav .nav-link {
    color: #7f5253;

    &:hover {
      color: white;
    }

    .nav-item {
      color: red;
    }
  }
`;

export const ProjectListStyle = styled.section`
  a {
    text-decoration: none;
    color: green;
  }
`;
export const ProjectCardStyle = styled.article`
  margin: 20px 0;

  .card {
    padding: 25px 10px;
    text-align: center;
    border: 1px solid blue;

    &:hover {
      background: #998283;
      cursor: pointer;
      border: 1px solid red;
    }
  }
`;

export const ProjectStyle = styled.section``;
