package com.mycompany.core.config;

import org.broadleafcommerce.common.demo.AutoImportPersistenceUnit;
import org.broadleafcommerce.common.demo.AutoImportSql;
import org.broadleafcommerce.common.demo.AutoImportStage;
import org.broadleafcommerce.common.demo.ImportCondition;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Conditional;
import org.springframework.context.annotation.Configuration;

/**
 * @author Nick Crum ncrum
 */
@Configuration
@Conditional(ImportCondition.class)
public class ImportSQLConfig {

    public static final int BASIC_DATA_SPECIAL = AutoImportStage.PRIMARY_PRE_BASIC_DATA+300;

    @Bean
    public AutoImportSql blReactDemoData() {
        return new AutoImportSql(AutoImportPersistenceUnit.BL_PU, "/sql/load_react_demo_data.sql", AutoImportStage.PRIMARY_POST_BASIC_DATA);
    }

}