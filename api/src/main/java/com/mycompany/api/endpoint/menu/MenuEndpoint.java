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