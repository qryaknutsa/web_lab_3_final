package managedBeans;

import java.io.IOException;
import java.io.Serializable;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class TableController implements Serializable {
    private List<ResultBean> results;

    public TableController() {
    }

    private ResultBean result = new ResultBean();

    public void setResult(ResultBean result) {
        this.result = result;
    }

    public void setResults(List<ResultBean> results) {
        this.results = results;
    }

    public ResultBean getResult() {
        return result;
    }

    //Соединение к базе данных
    public Connection getConnection() throws IOException {
        Connection connection = null;
//        Properties props = new Properties();
//        try (InputStream in = Files.newInputStream(Paths.get("databaseProperties.txt"))) {
//            props.load(in);
//        }
//        String url = props.getProperty("url");
//        String username = props.getProperty("username");
//        String password = props.getProperty("password");


        try {
            connection = DriverManager.getConnection(url, username, password);
        } catch (SQLException e) {
            System.out.println("Не получилось...");
            e.printStackTrace();
            System.exit(-1);
        }
        return connection;
    }

    public List<ResultBean> getResults() throws IOException {

        ResultSet rs = null;
        PreparedStatement pst = null;
        Connection con = getConnection();
        String stm = "Select * from results"; //"select x, y, r, inArea from s336385.results"
        List<ResultBean> results = new ArrayList<ResultBean>();

        try {
            pst = con.prepareStatement(stm);
            pst.execute();
            rs = pst.getResultSet();

            while (rs.next()) {
                ResultBean resultBean = new ResultBean();
                resultBean.setX(rs.getDouble("x"));
                resultBean.setY(rs.getDouble("y"));
                resultBean.setR(rs.getDouble("r"));
                boolean res = rs.getBoolean("inarea");
                resultBean.setTime(rs.getDouble("comptime"));
                resultBean.setDate(rs.getString("curdate"));


                if (res) resultBean.setInArea("Попал");
                else resultBean.setInArea("Не попал");
                results.add(resultBean);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return results;
    }


    public void cleanTable() {
        try {
            System.out.println("CLEAN");
            result.checkArea();
            Connection connection = getConnection();
            PreparedStatement prepareStatement = connection.prepareStatement("delete from results");
            prepareStatement.execute();
        } catch (SQLException | IOException e) {
            System.out.println(e.getMessage());
        }
    }

    public void set_r1() {
        System.out.println("it is 1");
        result.setR(1);
    }

    public void set_r2() {
        System.out.println("it is 2");
        result.setR(2);
    }

    public void set_r3() {
        System.out.println("it is 3");
        result.setR(3);
    }

    public void set_r4() {
        System.out.println("it is 4");
        result.setR(4);
    }

    public void set_r5() {
        System.out.println("it is 5");
        result.setR(5);
    }


    public String addResult() {

        try {
            System.out.println("ADD");
            result.checkArea();
            Connection connection = getConnection();
            PreparedStatement prepareStatement = connection.prepareStatement("insert into results(id, x, y, r, inarea, comptime, curdate) values(?, ?, ?, ?, ?, ?, ?)");
            prepareStatement.setDouble(1, 1);
            prepareStatement.setDouble(2, result.getX());
            prepareStatement.setDouble(3, result.getY());
            prepareStatement.setDouble(4, result.getR());

            if (result.getInArea().equals("Попал")) prepareStatement.setBoolean(5, true);
            else prepareStatement.setBoolean(5, false);

            prepareStatement.setDouble(6, result.getTime());
            prepareStatement.setString(7, result.getDate());
            prepareStatement.executeUpdate();
            connection.close();
        } catch (SQLException | IOException e) {
            System.out.println(e.getMessage());
        }
        return "main.xhtml?faces-redirect=true";
    }

}
