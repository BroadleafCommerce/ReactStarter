/*
 * #%L
 * React API Starter
 * %%
 * Copyright (C) 2009 - 2017 Broadleaf Commerce
 * %%
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *       http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * #L%
 */
package com.mycompany.api.endpoint.menu;

import org.broadleafcommerce.menu.domain.Menu;
import org.broadleafcommerce.menu.dto.MenuItemDTO;
import org.broadleafcommerce.menu.service.MenuService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import javax.annotation.Resource;

/**
 * @author Nick Crum (ncrum)
 */
@RestController
@RequestMapping(value = "/menu",
        produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
public class MenuEndpoint {

    @Resource(name = "blMenuService")
    protected MenuService menuService;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<MenuItemDTO> findMenu(@RequestParam String name){
        Menu menu = menuService.findMenuByName(name);
        return menuService.constructMenuItemDTOsForMenu(menu);
    }
}