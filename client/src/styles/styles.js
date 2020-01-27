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
export const ProjectSubNavStyle = styled.nav`
  .navbar-nav {
    display: flex;
    flex-direction: column;
  }

  .nav-item {
    width: 300px;
    margin: 10px auto;
    padding: 10px 15px;
    border: 1px solid blue;
    border-radius: 35px;
    text-align: center;
    background: #ffdadb;

    &:hover {
      background: #dafffe;
      cursor: pointer;
    }
  }

  a {
    text-decoration: none;
  }
`;

export const ActionListStyle = styled.section``;
export const ActionCardStyle = styled.article`
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
